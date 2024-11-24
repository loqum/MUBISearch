package com.mubisearch.content.controllers.dto;

import java.time.LocalDateTime;

public record ReviewRequest(Long idUser, Long idContent, String text) {
}

