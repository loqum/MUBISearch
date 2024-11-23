package com.mubisearch.content.controllers.dto;

import lombok.NonNull;

import java.time.LocalDateTime;

public record VoteRequest (@NonNull Long idContent, @NonNull Long idUser, @NonNull Integer score) {
}
