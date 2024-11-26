package com.mubisearch.notification.services;

import com.mubisearch.notification.configuration.RabbitMQConfig;
import com.mubisearch.notification.entities.NotificationMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationListener {

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void handleNotification(NotificationMessage message) {
        System.out.println("Mensaje recibido: " + message);

        Long userId = message.getIdUser();
        Long contentId = message.getIdContent();
        boolean notification = message.isNotification();

        log.info("Notificando al usuario " + userId + " sobre el contenido " + contentId + " con notificación " + notification);

        // Implementa aquí la lógica de notificación (por ejemplo, enviar un correo o una notificación push)
    }
}
