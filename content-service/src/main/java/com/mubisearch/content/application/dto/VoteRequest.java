package com.mubisearch.content.application.dto;

import lombok.NonNull;

public record VoteRequest (@NonNull Long idContent, @NonNull Long idUser, @NonNull Integer score) {
}
