package com.mubisearch.content.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.mubisearch.content.controllers.dto.*;
import com.mubisearch.content.entities.Genre;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class SeriesService extends BaseService<SeriesDto> {

    @Value("${tmdb.api.url.search.series.title}")
    private String apiUrl;

    @Value("${tmdb.api.url.search.series.discover}")
    private String discoverUrl;

    @Value("${tmdb.api.url.search.series.genres}")
    private String genresUrl;

    public List<SeriesDto> getSeries(String title) {
        Map<String, String> params = Map.of("title", title);
        TypeReference<SearchResponse<SeriesDto>> seriesType = new TypeReference<>() {};
        SearchResponse<SeriesDto> response = fetchData(apiUrl, params, seriesType);

        if (response != null) {
//            getGenreName(response);
            return response.getResults();
        }

        return List.of();
    }

    public List<SeriesDto> getSeriesDiscover() {
        TypeReference<SearchResponse<SeriesDto>> seriesType = new TypeReference<>() {};
        SearchResponse<SeriesDto> response = fetchData(discoverUrl, null, seriesType);

        if (response != null) {
//            getGenreName(response);
            return response.getResults();
        }
        return List.of();
    }

//    public GenreResponse getGenres() {
//        TypeReference<GenreResponse> genreResponseTypeReference = new TypeReference<>() {};
//        return fetchData(genresUrl, null, genreResponseTypeReference);
//    }
//
//    private void getGenreName(SearchResponse<SeriesDto> response) {
//
//        for (SeriesDto series : response.getResults()) {
//
//            List<Genre> genreNames = series.getGenres().stream()
//                    .map(id -> series.getGenres().stream()
//                            .filter(genre -> genre.equals(id))
//                            .map(GenreDto::getName)
//                            .findFirst()
//                            .orElse("Unknown"))
//                    .collect(Collectors.toList());
//            series.setGenresNames(genreNames);
//        }
//    }

}
