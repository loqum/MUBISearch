package com.mubisearch.notification.services;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class NotificationAlertListener {

    private final Map<Long, Map<Long, Boolean>> userAlerts = new HashMap<>();

    @RabbitListener(queues = "notification_alert_queue")
    public void handleNotificationAlertUpdate(Map<String, Object> message) {
        Long idUser = Long.valueOf(message.get("idUser").toString());
        Long idContent = Long.valueOf(message.get("idContent").toString());
        boolean notificationAlert = Boolean.parseBoolean(message.get("notificationAlert").toString());

        userAlerts.computeIfAbsent(idContent, k -> new HashMap<>()).put(idUser, notificationAlert);

        System.out.println("Actualizado alert para user " + idUser + " y content " + idContent + ": " + notificationAlert);
    }

    public Map<Long, Boolean> getUserAlerts(Long idContent, Long excludedIdUser) {
        return userAlerts.getOrDefault(idContent, new HashMap<>())
                .entrySet()
                .stream()
                .filter(entry -> !entry.getKey().equals(excludedIdUser))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

}
