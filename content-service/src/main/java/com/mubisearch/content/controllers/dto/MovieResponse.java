package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.*;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class MovieResponse  {

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
    private String originalTitle;
    private LocalDate releaseDate;

    public static MovieResponse from(Movie movie) {
         return MovieResponse.builder()
                .id(movie.getId())
                .originalTitle(movie.getOriginalTitle())
                .releaseDate(movie.getReleaseDate())
                .idExternal(movie.getIdExternal())
                .createdAt(movie.getCreatedAt())
                .updatedAt(movie.getUpdatedAt())
                .title(movie.getTitle())
                .plot(movie.getPlot())
                .posterPath(movie.getPosterPath())
                .genres(movie.getGenres())
                .reviews(movie.getReviews())
                .votes(movie.getVotes())
                .build();
    }
}

