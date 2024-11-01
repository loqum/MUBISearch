package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.Content;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ContentResponse {

    private Long id;
    private Long idExternal;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String title;
    private String plot;
    private String posterPath;

    public static ContentResponse from(Content content) {
        return ContentResponse.builder()
                .id(content.getId())
                .idExternal(content.getIdExternal())
                .createdAt(content.getCreatedAt())
                .updatedAt(content.getUpdatedAt())
                .title(content.getTitle())
                .plot(content.getPlot())
                .posterPath(content.getPosterPath())
                .build();
    }
}

