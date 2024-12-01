package com.mubisearch.user.rest.dto;

import lombok.NonNull;

public record FavoriteRequest(@NonNull Long idUser, @NonNull Long idContent) {}