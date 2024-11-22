package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.Content;
import lombok.NonNull;

public record VoteRequest (@NonNull Content content, @NonNull Long idUser, @NonNull Integer score) {
}
