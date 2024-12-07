package com.mubisearch.user.rest.dto;

import com.mubisearch.user.entities.Roles;
import lombok.NonNull;

public record UserRegisterRequest(@NonNull String sub, @NonNull String name, @NonNull String email, @NonNull Roles role) {}
