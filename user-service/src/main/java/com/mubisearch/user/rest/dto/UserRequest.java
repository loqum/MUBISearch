package com.mubisearch.user.rest.dto;

import lombok.NonNull;

public record UserRequest(@NonNull String name, @NonNull String fullName, @NonNull String password) {}
