package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.ContentGenre;
import com.mubisearch.content.entities.Genre;
import com.mubisearch.content.entities.Review;
import com.mubisearch.content.entities.Vote;
import lombok.NonNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record MovieRequest(@NonNull String originalTitle,
                           @NonNull LocalDate releaseDate,
                           @NonNull Long id,
                           @NonNull BigDecimal averageScore,
                           @NonNull String title, @NonNull String plot, @NonNull String posterPath, List<Vote> votes,
                           Map<Integer, String> genres, List<Review> reviews) {
}
