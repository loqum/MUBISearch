package com.mubisearch.content.adapters.outgoing.messaging;

import com.mubisearch.content.configuration.RabbitMQConfig;
import com.mubisearch.content.domain.model.NotificationType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.MessageDeliveryMode;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContentUpdatePublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publishContentUpdate(Long idUser, Long idContent, NotificationType notificationType) {
        Map<String, Object> message = Map.of(
                "idUser", idUser,
                "idContent", idContent,
                "notificationType", notificationType.name()
        );

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY.replace("#", idContent.toString()), message, m -> {
            m.getMessageProperties().setDeliveryMode(MessageDeliveryMode.PERSISTENT);
            return m;
        });
        log.info("Published content update for user {} and content {}: {}", idUser, idContent, notificationType);
    }
}
