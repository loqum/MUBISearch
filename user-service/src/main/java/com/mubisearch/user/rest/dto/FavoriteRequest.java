package com.mubisearch.user.rest.dto;

import lombok.NonNull;

import java.time.LocalDateTime;

public record FavoriteRequest(@NonNull Long idUser, @NonNull Long idContent, @NonNull LocalDateTime createdAt) {}