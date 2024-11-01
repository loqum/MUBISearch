package com.mubisearch.notification.controllers.dto;

import com.mubisearch.notification.entities.NotificationType;
import lombok.NonNull;

public record NotificationRequest(@NonNull Long idUser, @NonNull Long idContent, @NonNull NotificationType type, @NonNull String description) {}
