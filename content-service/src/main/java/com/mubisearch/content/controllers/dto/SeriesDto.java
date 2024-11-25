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
public class SeriesDto {

    @JsonProperty("id")
    private Long id;
    @JsonProperty("overview")
    private String plot;
    @JsonProperty("poster_path")
    private String posterPath;
    @JsonProperty("first_air_date")
    private Date firstAir;
    @JsonProperty("origin_country")
    private List<String> originCountry;
    @JsonProperty("original_name")
    private String originalName;
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
