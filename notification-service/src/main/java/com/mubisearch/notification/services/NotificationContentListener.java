package com.mubisearch.notification.services;

import com.mubisearch.notification.configuration.RabbitMQConfig;
import com.mubisearch.notification.entities.Notification;
import com.mubisearch.notification.entities.NotificationType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@Slf4j
public class NotificationContentListener {

    @Autowired
    private NotificationAlertListener notificationAlertListener;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private RabbitTemplate rabbitTemplate;


    @RabbitListener(queues = RabbitMQConfig.CONTENT_UPDATE_QUEUE)
    public void handleContentUpdate(Map<String, Object> message) {
        System.out.println("Mensaje recibido: " + message);

        long idUser = ((Number) message.get("idUser")).longValue();
        Long idContent = ((Number) message.get("idContent")).longValue();
        NotificationType notificationType = NotificationType.valueOf((String) message.get("notificationType"));

        log.info("Notificando al usuario " + idUser + " sobre el contenido " + idContent + " con notificación " + notificationType);


        // Excluimos al propio usuario para que no reciba una notificación de sí mismo
        Map<Long, Boolean> userAlerts = notificationAlertListener.getUserAlerts(idContent, idUser);
        log.info("Usuarios interesados en el contenido " + idContent + ": " + userAlerts);

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
                publishEmailToQueue(id, getDescription(notificationType));
            }
        });

    }

    private void publishEmailToQueue(Long idUser, String text) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EMAIL_QUEUE,
                Map.of(
                        "idUser", idUser,
                        "subject", "Tienes nuevas notificaciones",
                        "text", text
                )
        );
        log.info("Mensaje de correo enviado a la cola para el usuario " + idUser);

    }

    private String getDescription(NotificationType notificationType) {
        return switch (notificationType) {
            case NEW_REVIEW -> "Hay nuevas reseñas";
            case NEW_VOTE -> "Hay nuevos votos";
        };
    }
}
