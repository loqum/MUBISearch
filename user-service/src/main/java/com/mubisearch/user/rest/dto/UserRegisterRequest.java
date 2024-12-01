package com.mubisearch.user.rest.dto;

import lombok.NonNull;

public record UserRegisterRequest(@NonNull String sub, @NonNull String name, @NonNull String email) {}
