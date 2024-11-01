package com.mubisearch.content.controllers.dto;

import lombok.NonNull;

import java.time.LocalDateTime;

public record ContentRequest(@NonNull Long idExternal, @NonNull LocalDateTime createdAt, @NonNull LocalDateTime updatedAt, @NonNull String title, @NonNull String plot, @NonNull String posterPath) { }
