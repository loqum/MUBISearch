package com.mubisearch.user.controllers.dto;

import com.mubisearch.user.entities.UserRole;
import lombok.NonNull;

public record UserRequest(@NonNull String name, @NonNull String email, @NonNull String password) {}
