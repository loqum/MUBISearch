package com.mubisearch.notification.configuration;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String EXCHANGE_NAME = "content_updates";

    //Colas
    public static final String CONTENT_UPDATE_QUEUE = "content_update_queue";
    public static final String NOTIFICATION_ALERT_QUEUE = "notification_alert_queue";

    //routing keys
    public static final String CONTENT_UPDATE_ROUTING_KEY = "content.update.#";
    public static final String NOTIFICATION_ALERT_ROUTING_KEY = "alert.update";

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue contentUpdateQueue() {
        return new Queue(CONTENT_UPDATE_QUEUE, true);
    }

    @Bean
    public Queue notificationAlertQueue() {
        return new Queue(NOTIFICATION_ALERT_QUEUE, true);
    }

    @Bean
    public Binding contentUpdateBinding(Queue contentUpdateQueue, TopicExchange exchange) {
        return BindingBuilder.bind(contentUpdateQueue).to(exchange).with(CONTENT_UPDATE_ROUTING_KEY);
    }

    @Bean
    public Binding notificationAlertBinding(Queue notificationAlertQueue, TopicExchange exchange) {
        return BindingBuilder.bind(notificationAlertQueue).to(exchange).with(NOTIFICATION_ALERT_ROUTING_KEY);
    }

    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, Jackson2JsonMessageConverter jsonMessageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter);
        return rabbitTemplate;
    }


}
