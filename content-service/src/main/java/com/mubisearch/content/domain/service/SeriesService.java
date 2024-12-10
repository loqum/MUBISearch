package com.mubisearch.content.domain.service;

import com.mubisearch.content.application.dto.SeriesRequest;
import com.mubisearch.content.domain.model.ContentGenre;
import com.mubisearch.content.domain.model.Genre;
import com.mubisearch.content.domain.model.Series;
import com.mubisearch.content.domain.repository.ContentGenreRepository;
import com.mubisearch.content.domain.repository.SeriesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class SeriesService  {

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
                .backdropPath(seriesRequest.backdropPath())
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
