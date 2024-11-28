package com.mubisearch.notification.services;

import com.mubisearch.notification.configuration.RabbitMQConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
public class EmailListener {

    @Autowired
    private EmailService emailService;

    @RabbitListener(queues = RabbitMQConfig.EMAIL_QUEUE)
    public void handleEmailQueue(Map<String, Object> message) {
        try {
            long idUser = ((Number) message.get("idUser")).longValue();
            String subject = (String) message.get("subject");
            String text = (String) message.get("text");

            log.info("Enviando correo a usuario {} con asunto: {}", idUser , subject);
            emailService.sendEmail(subject, text);
            log.info("Correo enviado a usuario {} con asunto: {}", idUser , subject);
        } catch (Exception e) {
            log.error("Error procesando el mensaje de correo: {}", message, e);
        }
    }

}
