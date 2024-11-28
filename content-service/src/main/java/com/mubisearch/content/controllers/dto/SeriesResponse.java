package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.Movie;
import com.mubisearch.content.entities.Review;
import com.mubisearch.content.entities.Series;
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


    public static SeriesResponse from(Series series) {
         return SeriesResponse.builder()
                .id(series.getId())
                .createdAt(series.getCreatedAt())
                .updatedAt(series.getUpdatedAt())
                 .averageScore(series.getAverageScore())
                 .firstAir(series.getFirstAir())
                 .originCountry(series.getOriginCountry())
                 .originalName(series.getOriginalName())
                .title(series.getOriginalName())
                .plot(series.getPlot())
                .posterPath(series.getPosterPath())
                .genres(series.getGenres().stream().map(x -> x.getGenre().getName()).toList())
                .reviews(series.getReviews())
                .votes(series.getVotes())
                .build();
    }
}

