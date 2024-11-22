package com.mubisearch.user.rest.dto;

import lombok.NonNull;

public record UserLoginRequest(@NonNull String name, @NonNull String password) {}
