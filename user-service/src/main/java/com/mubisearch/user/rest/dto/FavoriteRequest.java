package com.mubisearch.user.rest.dto;

import com.mubisearch.user.entities.User;
import lombok.NonNull;

import java.time.LocalDateTime;

public record FavoriteRequest(@NonNull Long idUser, @NonNull Long idContent) {}