package com.mubisearch.notification.services;

import com.mubisearch.notification.configuration.RabbitMQConfig;
import com.mubisearch.notification.entities.Notification;
import com.mubisearch.notification.entities.NotificationType;
import com.mubisearch.notification.entities.dto.ContentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationContentListener {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${contentService.getContentById.url}")
    private String getContentById;

    @RabbitListener(queues = RabbitMQConfig.CONTENT_UPDATE_QUEUE)
    public void handleContentUpdate(Map<String, Object> message) {
        System.out.println("Mensaje recibido: " + message);

        long idUser = ((Number) message.get("idUser")).longValue();
        Long idContent = ((Number) message.get("idContent")).longValue();
        NotificationType notificationType = NotificationType.valueOf((String) message.get("notificationType"));

        // Excluimos al propio usuario para que no reciba una notificación de sí mismo
        Map<Long, Boolean> userAlerts = getUserAlerts(idContent, idUser);
        log.info("Usuarios interesados en el contenido " + idContent + ": " + userAlerts);
        log.info("Notificando al usuario " + idUser + " sobre el contenido " + idContent + " con notificación " + notificationType);

        userAlerts.forEach((id, isAlerted) -> {
            if (isAlerted) {
                System.out.println("Generando notificación para user " + id + " y content " + idContent);
                Notification notification = Notification.builder()
                        .idUser(id)
                        .idContent(idContent)
                        .notificationType(notificationType)
                        .description(getDescription(notificationType))
                        .createdAt(LocalDateTime.now())
                        .build();
                notificationService.save(notification);
                publishEmailToQueue(id, idContent, getText(idContent, notificationType));
            }
        });

    }

    private Map<Long, Boolean> getUserAlerts(Long idContent, Long idUser) {
        String redisKey = "notifications:content:" + idContent;
        Map<Object, Object> redisResult = redisTemplate.opsForHash().entries(redisKey);
        return redisResult.entrySet().stream()
                .filter(entry -> !entry.getKey().equals(String.valueOf(idUser)))
                .collect(Collectors.toMap(
                        entry -> Long.valueOf((String) entry.getKey()),
                        entry -> Boolean.valueOf((String) entry.getValue())
                ));
    }


    private void publishEmailToQueue(Long idUser, Long idContent, String text) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EMAIL_QUEUE,
                Map.of(
                        "idUser", idUser,
                        "idContent", idContent,
                        "subject", "Tienes nuevas notificaciones",
                        "text", text
                )
        );
        log.info("Mensaje de correo enviado a la cola para el usuario " + idUser);

    }

    private String getDescription(NotificationType notificationType) {
        return switch (notificationType) {
            case NEW_REVIEW -> "Hay nuevas reseñas para ";
            case NEW_VOTE -> "Hay nuevos votos para ";
        };
    }

    private String getText(Long idContent, NotificationType notificationType) {
        try {
            ResponseEntity<ContentResponse> response = restTemplate.getForEntity(getContentById, ContentResponse.class, idContent);
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("No se ha podido obtener el contenido con id " + idContent);
            }
            ContentResponse contentResponse = response.getBody();

            return getDescription(notificationType) + contentResponse.getTitle() + " en MUBISearch. ¡No te lo pierdas!";

        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().is4xxClientError()) {
                throw new RuntimeException("No se ha podido obtener el contenido con id " + idContent);
            }
            throw new RuntimeException("Error al obtener el contenido con id " + idContent);
        }
    }

}
