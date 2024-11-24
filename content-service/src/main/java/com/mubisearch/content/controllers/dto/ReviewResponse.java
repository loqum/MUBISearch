package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.Review;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReviewResponse {

    private Long id;
    private Long idUser;
    private Long idContent;
    private String text;
    private LocalDateTime createdAt;

    public static ReviewResponse from(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .idUser(review.getIdUser())
                .idContent(review.getContent().getId())
                .text(review.getText())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
