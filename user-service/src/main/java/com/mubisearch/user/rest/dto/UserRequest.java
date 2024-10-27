package com.mubisearch.user.rest.dto;

import lombok.NonNull;

public record UserRequest(@NonNull String name, @NonNull String email, @NonNull String password) {}
