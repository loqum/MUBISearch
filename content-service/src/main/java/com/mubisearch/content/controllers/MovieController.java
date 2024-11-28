package com.mubisearch.content.controllers;

import com.mubisearch.content.controllers.dto.BaseDto;
import com.mubisearch.content.controllers.dto.MovieDto;
import com.mubisearch.content.controllers.dto.MovieRequest;
import com.mubisearch.content.controllers.dto.MovieResponse;
import com.mubisearch.content.entities.Movie;
import com.mubisearch.content.services.MovieService;
import com.mubisearch.content.services.TMDBService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("api/v1/movies")
public class MovieController {

    @Autowired
    private TMDBService tmdbService;

    @Autowired
    private MovieService movieService;

    @GetMapping("/title/{title}")
    @ResponseStatus(HttpStatus.OK)
    public BaseDto<MovieDto> getMoviesByTitle(@PathVariable @NotNull String title) {
        log.info("Init getMoviesByTitle");
        if (tmdbService.getMovies(title).isEmpty()) {
            return new BaseDto<>(false, List.of());
        } else {
            return new BaseDto<>(true, tmdbService.getMovies(title));
        }
    }

    @GetMapping("/discover")
    @ResponseStatus(HttpStatus.OK)
    public BaseDto<MovieDto> getMoviesDiscover() {
        log.info("Init getMoviesDiscover");
        if (tmdbService.getMoviesDiscover().isEmpty()) {
            return new BaseDto<>(false, List.of());
        } else {
            return new BaseDto<>(true, tmdbService.getMoviesDiscover());
        }
    }

    @GetMapping("/id/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MovieResponse> getMovieById(@PathVariable @NotNull Long id) {
        log.info("Init getMovieById");
        Optional<Movie> movie = movieService.findById(id);
        return movie.map(u -> ResponseEntity.ok().body(MovieResponse.from(u))).orElse(ResponseEntity.noContent().build());
    }

    @PostMapping("/create")
    public ResponseEntity<String> createMovie(@RequestBody MovieRequest movieRequest) {
        log.info("Init createContent");
        String idContent = movieService.createMovie(movieRequest).getId().toString();
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{idContent}")
                .buildAndExpand(idContent)
                .toUri();
        return ResponseEntity.created(uri).body(idContent);
    }


}
