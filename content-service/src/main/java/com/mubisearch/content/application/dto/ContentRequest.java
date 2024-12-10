package com.mubisearch.content.application.dto;

import com.mubisearch.content.domain.model.Genre;
import com.mubisearch.content.domain.model.Review;
import com.mubisearch.content.domain.model.Vote;
import lombok.NonNull;

import java.util.List;

public record ContentRequest(@NonNull Long id, @NonNull String title, @NonNull String plot,
                             @NonNull String posterPath, @NonNull String backdropPath, List<Vote> votes, List<Genre> genres, List<Review> reviews) {
}
