package com.mubisearch.content.controllers.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mubisearch.content.entities.Genre;
import lombok.*;

import java.util.*;
import java.util.stream.Collectors;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieDto {

    @JsonProperty("id")
    private Long idExternal;
    private String title;
    @JsonProperty("overview")
    private String plot;
    @JsonProperty("poster_path")
    private String posterPath;
    @JsonProperty("original_title")
    private String originalTitle;
    @JsonProperty("release_date")
    private Date releaseDate;
    @JsonProperty("genre_ids")
    private void setGenresFromIds(List<Integer> genreIds) {
        this.genres = mapGenresById(genreIds);
    }

    private Map<Integer, String> genres = new HashMap<>();

    private static Map<Integer, String> mapGenresById(List<Integer> genreIds) {
        return genreIds.stream()
                .map(Genre::valueOfId)
                .filter(Objects::nonNull)
                .collect(Collectors.toMap(Genre::getId, Genre::getName));
    }

}
