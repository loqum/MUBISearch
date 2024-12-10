package com.mubisearch.content.application.dto;

import com.mubisearch.content.domain.model.Movie;
import com.mubisearch.content.domain.model.Review;
import com.mubisearch.content.domain.model.Vote;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class MovieResponse  {

    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String title;
    private String plot;
    private String posterPath;
    private String backdropPath;
    private BigDecimal averageScore;
    private List<String> genres = new ArrayList<>();
    private List<Review> reviews = new ArrayList<>();
    private List<Vote> votes = new ArrayList<>();
    private String originalTitle;
    private LocalDate releaseDate;

    public static MovieResponse from(Movie movie) {
         return MovieResponse.builder()
                .id(movie.getId())
                .originalTitle(movie.getOriginalTitle())
                .releaseDate(movie.getReleaseDate())
                .createdAt(movie.getCreatedAt())
                .updatedAt(movie.getUpdatedAt())
                 .averageScore(movie.getAverageScore())
                .title(movie.getTitle())
                .plot(movie.getPlot())
                .posterPath(movie.getPosterPath())
                 .backdropPath(movie.getBackdropPath())
                .genres(movie.getGenres().stream().map(x -> x.getGenre().getName()).toList())
                .reviews(movie.getReviews())
                .votes(movie.getVotes())
                .build();
    }
}

