package com.mubisearch.content.controllers;

import com.mubisearch.content.controllers.dto.*;
import com.mubisearch.content.services.MovieService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("api/v1/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/title/{title}")
    @ResponseStatus(HttpStatus.OK)
    public BaseDto<MovieDto> getMoviesByTitle(@PathVariable @NotNull String title) {
        log.info("Init getMoviesByTitle");
        if (movieService.getMovies(title).isEmpty()) {
            return new BaseDto<>(false, List.of());
        } else {
            return new BaseDto<>(true, movieService.getMovies(title));
        }
    }

    @GetMapping("/discover")
    @ResponseStatus(HttpStatus.OK)
    public BaseDto<MovieDto> getMoviesDiscover() {
        log.info("Init getMoviesDiscover");
        if (movieService.getMoviesDiscover().isEmpty()) {
            return new BaseDto<>(false, List.of());
        } else {
            return new BaseDto<>(true, movieService.getMoviesDiscover());
        }
    }

    @GetMapping("/idExternal/{idExternal}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MovieResponse> getMoviesByIdExternal(@PathVariable @NotNull Long idExternal) {
        log.info("Init getMoviesByIdExternal");
        return movieService.findByIdExternal(idExternal).map(u -> ResponseEntity.ok().body(MovieResponse.from(u))).orElse(ResponseEntity.noContent().build());
    }

    @PostMapping
    public ResponseEntity<String> createMovie(@PathVariable("idUser") @NotNull Long idUser, @RequestBody MovieRequest movieRequest) {
        log.info("Init createContent");
        String idContent = movieService.createMovie(idUser, movieRequest).getId().toString();
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{idContent}")
                .buildAndExpand(idContent)
                .toUri();
        return ResponseEntity.created(uri).body(idContent);
    }

}
