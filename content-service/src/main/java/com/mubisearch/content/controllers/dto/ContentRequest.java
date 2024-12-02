package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.Genre;
import com.mubisearch.content.entities.Review;
import com.mubisearch.content.entities.Vote;
import lombok.NonNull;

import java.time.LocalDateTime;
import java.util.List;

public record ContentRequest(@NonNull Long id, @NonNull String title, @NonNull String plot,
                             @NonNull String posterPath, @NonNull String backdropPath, List<Vote> votes, List<Genre> genres, List<Review> reviews) {
}
