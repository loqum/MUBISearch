package com.mubisearch.content.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.mubisearch.content.controllers.dto.MovieDto;
import com.mubisearch.content.controllers.dto.SearchResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class MovieService extends BaseService<MovieDto> {

    @Value("${tmdb.api.url.search.movie.title}")
    private String apiUrl;

    @Value("${tmdb.api.url.search.movie.discover}")
    private String discoverUrl;

    public List<MovieDto> getMovies(String title) {
        Map<String, String> params = Map.of("title", title);
        TypeReference<SearchResponse<MovieDto>> movieType = new TypeReference<>() {};
        SearchResponse<MovieDto> response = fetchData(apiUrl, params, movieType);
        if (response != null) {
            return response.getResults();
        }
        return List.of();
    }

    public List<MovieDto> getMoviesDiscover() {
        TypeReference<SearchResponse<MovieDto>> movieType = new TypeReference<>() {};
        SearchResponse<MovieDto> response = fetchData(discoverUrl, null, movieType);
        if (response != null) {
            return response.getResults();
        }
        return List.of();
    }

}
