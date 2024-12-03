package com.mubisearch.content.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.mubisearch.content.controllers.dto.MovieDto;
import com.mubisearch.content.controllers.dto.SearchResponse;
import com.mubisearch.content.controllers.dto.SeriesDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class TMDBService extends BaseService<MovieDto> {

    @Value("${tmdb.api.url.search.movie.title}")
    private String urlMovies;

    @Value("${tmdb.api.url.search.series.title}")
    private String urlSeries;

    @Autowired
    private TmdbApiConfig tmdbApiConfig;

    public List<MovieDto> getMovies(String title) {
        Map<String, String> params = Map.of("title", title);
        TypeReference<SearchResponse<MovieDto>> movieType = new TypeReference<>() {};
        SearchResponse<MovieDto> response = fetchData(urlMovies, params, movieType);
        if (response != null) {
            return response.getResults();
        }
        return List.of();
    }

    public List<SeriesDto> getSeries(String title) {
        Map<String, String> params = Map.of("title", title);
        TypeReference<SearchResponse<SeriesDto>> seriesType = new TypeReference<>() {};
        SearchResponse<SeriesDto> response = fetchData(urlSeries, params, seriesType);
        if (response != null) {
            return response.getResults();
        }
        return List.of();
    }

    @Cacheable("moviesDiscover")
    public List<MovieDto> getMoviesDiscover(int page) {
        log.info("Fetching movies from TMDB API");
        log.info("Discover URL: {}", tmdbApiConfig.getDiscoverMoviesUrl(page));
        TypeReference<SearchResponse<MovieDto>> movieType = new TypeReference<>() {};
        SearchResponse<MovieDto> response = fetchData(tmdbApiConfig.getDiscoverMoviesUrl(page), null, movieType);
        if (response != null) {
            log.info("Response from TMDB: {}", response);
            return response.getResults();
        }
        return List.of();
    }

}
