package com.mubisearch.notification.entities.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class ContentResponse {

    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String title;
    private String plot;
    private String posterPath;
    private BigDecimal averageScore;
    private Map<Long, String> genres;
    private String type;
    private String originalTitle;
    private LocalDate releaseDate;
    private String originalName;
    private LocalDate firstAirDate;
    private String originCountry;

}