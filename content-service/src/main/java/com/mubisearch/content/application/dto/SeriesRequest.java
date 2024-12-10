package com.mubisearch.content.application.dto;

import com.mubisearch.content.domain.model.Review;
import com.mubisearch.content.domain.model.Vote;
import lombok.NonNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record SeriesRequest(@NonNull String originCountry,
                            @NonNull String originalName,
                            @NonNull LocalDate firstAir,
                            @NonNull Long id,
                            @NonNull BigDecimal averageScore, @NonNull String plot, @NonNull String posterPath, @NonNull String backdropPath, List<Vote> votes,
                            Map<Integer, String> genres, List<Review> reviews) {
}
