package com.mubisearch.content.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.mubisearch.content.controllers.dto.MovieDto;
import com.mubisearch.content.controllers.dto.SearchResponse;
import com.mubisearch.content.entities.Movie;
import com.mubisearch.content.repositories.MovieRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MovieService extends BaseService<MovieDto> {

    @Autowired
    private MovieRepository movieRepository;

    @Value("${tmdb.api.url.search.movie.title}")
    private String apiUrl;

    @Value("${tmdb.api.url.search.movie.discover}")
    private String discoverUrl;

    @Cacheable(value = "movies")
    public List<MovieDto> getMovies(String title) {
        Map<String, String> params = Map.of("title", title);
        TypeReference<SearchResponse<MovieDto>> movieType = new TypeReference<>() {};
        SearchResponse<MovieDto> response = fetchData(apiUrl, params, movieType);
        if (response != null) {
            return response.getResults();
        }
        return List.of();
    }

    @Cacheable("moviesDiscover")
    public List<MovieDto> getMoviesDiscover() {
        log.info("Fetching movies from TMDB API");
        TypeReference<SearchResponse<MovieDto>> movieType = new TypeReference<>() {};
        SearchResponse<MovieDto> response = fetchData(discoverUrl, null, movieType);
        if (response != null) {
            log.info("Response from TMDB: {}", response);
            return response.getResults();
        }
        return List.of();
    }

    @Cacheable(value = "movie", key = "#id")
    public Optional<Movie> findById(Long id) {
        return movieRepository.findById(id);
    }

    public Movie create(MovieDto movieDto) {
        Movie movie = Movie.builder()
                .idExternal(movieDto.getIdExternal())
                .title(movieDto.getTitle())
                .plot(movieDto.getPlot())
                .posterPath(movieDto.getPosterPath())
                .build();
        return movieRepository.save(movie);
    }

    @CacheEvict(value = "movie", key = "#id")
    public Movie update(Long id, Movie movie) {
        Movie entity = this.findById(id).orElse(null);
//        entity.set
        if (entity == null) {
            return null;
        }
        return movieRepository.save(entity);
    }

}
