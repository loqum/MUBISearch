package com.mubisearch.notification.controllers.dto;

import com.mubisearch.notification.entities.Notification;
import com.mubisearch.notification.entities.NotificationType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationResponse {

    private Long id;
    private Long idUser;
    private Long idContent;
    private NotificationType notificationType;
    private LocalDateTime createdAt;
    private String description;

    public static NotificationResponse from(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .idUser(notification.getIdUser())
                .idContent(notification.getIdContent())
                .notificationType(notification.getNotificationType())
                .createdAt(notification.getCreatedAt())
                .description(notification.getDescription())
                .build();
    }
}
