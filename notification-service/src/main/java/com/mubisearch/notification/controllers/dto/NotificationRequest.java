package com.mubisearch.notification.controllers.dto;

import com.mubisearch.notification.entities.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotificationRequest {

    Long idUser;
    Long idContent;
    NotificationType type;
    String description;

}
