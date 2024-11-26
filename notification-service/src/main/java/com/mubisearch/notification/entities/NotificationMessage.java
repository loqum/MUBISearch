package com.mubisearch.notification.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationMessage {

    private Long idUser;
    private Long idContent;
    private boolean notification;
}
