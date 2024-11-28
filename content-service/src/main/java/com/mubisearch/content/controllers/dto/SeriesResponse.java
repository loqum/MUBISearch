package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.Movie;
import com.mubisearch.content.entities.Review;
import com.mubisearch.content.entities.Vote;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class SeriesResponse {

    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String title;
    private String plot;
    private String posterPath;
    private String originalName;
    private String originCountry;
    private LocalDate firstAir;
    private BigDecimal averageScore;
    private List<String> genres = new ArrayList<>();
    private List<Review> reviews = new ArrayList<>();
    private List<Vote> votes = new ArrayList<>();


    public static SeriesResponse from(Movie movie) {
         return SeriesResponse.builder()
                .id(movie.getId())
                .createdAt(movie.getCreatedAt())
                .updatedAt(movie.getUpdatedAt())
                 .averageScore(movie.getAverageScore())
                 .firstAir(movie.getReleaseDate())
                 .originCountry(movie.getOriginalTitle())
                 .originalName(movie.getOriginalTitle())
                .title(movie.getTitle())
                .plot(movie.getPlot())
                .posterPath(movie.getPosterPath())
                .genres(movie.getGenres().stream().map(x -> x.getGenre().getName()).toList())
                .reviews(movie.getReviews())
                .votes(movie.getVotes())
                .build();
    }
}

