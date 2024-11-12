package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.Content;
import com.mubisearch.content.entities.ContentGenre;
import com.mubisearch.content.entities.Review;
import com.mubisearch.content.entities.Vote;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private List<ContentGenre> genres = new ArrayList<>();
    private List<Review> reviews = new ArrayList<>();
    private List<Vote> votes = new ArrayList<>();

    public static ContentResponse from(Content content) {
        return ContentResponse.builder()
                .id(content.getId())
                .idExternal(content.getIdExternal())
                .createdAt(content.getCreatedAt())
                .updatedAt(content.getUpdatedAt())
                .title(content.getTitle())
                .plot(content.getPlot())
                .posterPath(content.getPosterPath())
                .genres(content.getGenres())
                .reviews(content.getReviews())
                .votes(content.getVotes())
                .build();
    }
}

