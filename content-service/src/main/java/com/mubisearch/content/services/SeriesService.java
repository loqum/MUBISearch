package com.mubisearch.content.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.mubisearch.content.controllers.dto.*;
import com.mubisearch.content.entities.ContentGenre;
import com.mubisearch.content.entities.Genre;
import com.mubisearch.content.entities.Movie;
import com.mubisearch.content.entities.Series;
import com.mubisearch.content.repositories.ContentGenreRepository;
import com.mubisearch.content.repositories.SeriesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class SeriesService extends BaseService<SeriesDto> {

    @Autowired
    private SeriesRepository seriesRepository;

    @Autowired
    private ContentGenreRepository contentGenreRepository;

    @Transactional
    public Series createSeries(SeriesRequest seriesRequest) {
        Series series = Series.builder()
                .id(seriesRequest.id())
                .plot(seriesRequest.plot())
                .posterPath(seriesRequest.posterPath())
                .originCountry(seriesRequest.originCountry())
                .originalName(seriesRequest.originalName())
                .firstAir(seriesRequest.firstAir())
                .title(seriesRequest.originalName())
                .averageScore(BigDecimal.ZERO)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        try {
            series = seriesRepository.save(series);
        } catch (Exception e) {
            throw new RuntimeException("Error saving series: " + e.getMessage(), e);
        }

        if (seriesRequest.genres() != null && !seriesRequest.genres().isEmpty()) {
            Series finalSeries = series;
            List<ContentGenre> contentGenres = seriesRequest.genres().keySet().stream()
                    .map(id -> {
                        Genre genre = Genre.valueOfId(id);
                        if (genre != null) {
                            return new ContentGenre(finalSeries, genre);
                        } else {
                            throw new IllegalArgumentException("Genre not found for ID: " + id);
                        }
                    })
                    .toList();
            try {
                contentGenreRepository.saveAll(contentGenres);
            } catch (Exception e) {
                throw new RuntimeException("Error saving content genres: " + e.getMessage(), e);
            }
        }

        return series;
    }

    public Optional<Series> findById(Long id) {
        return seriesRepository.findById(id);
    }

}
