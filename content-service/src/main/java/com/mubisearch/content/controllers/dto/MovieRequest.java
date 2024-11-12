package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.ContentGenre;
import com.mubisearch.content.entities.Genre;
import com.mubisearch.content.entities.Review;
import com.mubisearch.content.entities.Vote;
import lombok.NonNull;

import java.time.LocalDate;
import java.util.List;

public record MovieRequest(@NonNull String originalTitle,
                           @NonNull LocalDate releaseDate,
                           @NonNull Long idExternal,
                           @NonNull String title, @NonNull String plot, @NonNull String posterPath, List<Vote> votes,
                           List<ContentGenre> genres, List<Review> reviews) {
}
