package com.mubisearch.user.rest.dto;

import lombok.NonNull;

public record UserRegisterRequest(@NonNull String name, @NonNull String fullName, @NonNull String password) {}
