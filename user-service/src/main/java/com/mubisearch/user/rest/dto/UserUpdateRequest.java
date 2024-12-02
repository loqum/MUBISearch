package com.mubisearch.user.rest.dto;

import java.time.LocalDate;

public record UserUpdateRequest(String fullname, LocalDate birthdate) {}
