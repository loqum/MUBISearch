package com.mubisearch.notification.services;

import com.mubisearch.notification.configuration.RabbitMQConfig;
import com.mubisearch.notification.entities.Notification;
import com.mubisearch.notification.entities.NotificationType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
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

//    @Value("${user.service.notification.url}")
//    private String urlUserNotification;

    @RabbitListener(queues = RabbitMQConfig.CONTENT_UPDATE_QUEUE)
    public void handleContentUpdate(Map<String, Object> message) {
        System.out.println("Mensaje recibido: " + message);

        long idUser = ((Number) message.get("idUser")).longValue();
        Long idContent = ((Number) message.get("idContent")).longValue();
        NotificationType notificationType = NotificationType.valueOf((String) message.get("notificationType"));

        log.info("Notificando al usuario " + idUser + " sobre el contenido " + idContent + " con notificación " + notificationType);

        // Obtener usuarios interesados en este contenido
        Map<Long, Boolean> userAlerts = notificationAlertListener.getUserAlerts(idContent);

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
                sendNotification();
            }
        });

    }

    private void sendNotification() {
        // Implementar aquí la lógica de notificación con correo (emailhog)
    }

    private String getDescription(NotificationType notificationType) {
        return switch (notificationType) {
            case NEW_REVIEW -> "Hay nuevas reseñas";
            case NEW_VOTE -> "Hay nuevos votos";
        };
    }
}
