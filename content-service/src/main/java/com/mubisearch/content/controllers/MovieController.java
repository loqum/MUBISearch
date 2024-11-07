package com.mubisearch.content.controllers;

import com.mubisearch.content.controllers.dto.BaseDto;
import com.mubisearch.content.controllers.dto.MovieDto;
import com.mubisearch.content.services.MovieService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

}
