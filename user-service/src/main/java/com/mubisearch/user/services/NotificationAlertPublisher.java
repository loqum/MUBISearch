package com.mubisearch.user.services;

import com.mubisearch.user.configuration.RabbitMQConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.MessageDeliveryMode;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationAlertPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publishAlertUpdate(Long idUser, Long idContent, Boolean notificationAlert) {
        Map<String, Object> message = Map.of(
                "idUser", idUser,
                "idContent", idContent,
                "notificationAlert", notificationAlert
        );

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY, message, m -> {
            m.getMessageProperties().setDeliveryMode(MessageDeliveryMode.PERSISTENT);
            return m;
        });
        log.info("Published alert update for user {} and content {}: {}", idUser, idContent, notificationAlert);
    }
}
