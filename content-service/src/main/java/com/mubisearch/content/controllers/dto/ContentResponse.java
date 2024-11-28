package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.*;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
@Builder
public class ContentResponse {

    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String title;
    private String plot;
    private String posterPath;
    private Map<Long, String> genres;
    private String type; // "Movie" o "Series"
    private List<Review> reviews = new ArrayList<>();
    private List<Vote> votes = new ArrayList<>();

    private String originalTitle;
    private LocalDate releaseDate;

    private String originalName;
    private LocalDate firstAirDate;
    private String originCountry;


    public static ContentResponse from(Content content) {
        return ContentResponse.builder()
                .id(content.getId())
                .createdAt(content.getCreatedAt())
                .updatedAt(content.getUpdatedAt())
                .title(content.getTitle())
                .plot(content.getPlot())
                .posterPath(content.getPosterPath())
                .type(content instanceof Movie ? "Movie" : "Series")
                .originalTitle(content instanceof Movie ? ((Movie) content).getOriginalTitle() : null)
                .releaseDate(content instanceof Movie ? ((Movie) content).getReleaseDate() : null)
                .originalName(content instanceof Series ? ((Series) content).getOriginalName() : null)
                .firstAirDate(content instanceof Series ? ((Series) content).getFirstAir() : null)
                .originCountry(content instanceof Series ? ((Series) content).getOriginCountry() : null)
                .genres(content.getGenres().stream()
                        .collect(Collectors.toMap(
                                ContentGenre::getId,
                                genre -> genre.getGenre().getName()
                        )))
                .reviews(content.getReviews())
                .votes(content.getVotes())
                .build();
    }

}

