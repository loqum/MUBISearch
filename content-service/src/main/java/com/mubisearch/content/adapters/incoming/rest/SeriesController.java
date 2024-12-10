package com.mubisearch.content.adapters.incoming.rest;

import com.mubisearch.content.adapters.outgoing.tmdb.dto.BaseDto;
import com.mubisearch.content.adapters.outgoing.tmdb.dto.SeriesDto;
import com.mubisearch.content.application.dto.SeriesRequest;
import com.mubisearch.content.application.dto.SeriesResponse;
import com.mubisearch.content.domain.model.Series;
import com.mubisearch.content.domain.service.SeriesService;
import com.mubisearch.content.adapters.outgoing.tmdb.TMDBService;
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
@RequestMapping("api/v1/series")
public class SeriesController {

    @Autowired
    private SeriesService seriesService;

    @Autowired
    private TMDBService tmdbService;

    @GetMapping("/title/{title}")
    @ResponseStatus(HttpStatus.OK)
    public BaseDto<SeriesDto> getSeriesByTitle(@PathVariable @NotNull String title) {
        log.info("Init getSeriesByTitle");
        if (tmdbService.getSeries(title).isEmpty()) {
            return new BaseDto<>(false, List.of());
        } else {
            return new BaseDto<>(true, tmdbService.getSeries(title));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createSeries(@RequestBody SeriesRequest seriesRequest) {
        log.info("Init createSeries");
        String idContent = seriesService.createSeries(seriesRequest).getId().toString();
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{idContent}")
                .buildAndExpand(idContent)
                .toUri();
        return ResponseEntity.created(uri).body(idContent);
    }

    @GetMapping("/id/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<SeriesResponse> getSeriesById(@PathVariable @NotNull Long id) {
        log.info("Init getSeriesById");
        Optional<Series> series = seriesService.findById(id);
        return series.map(u -> ResponseEntity.ok().body(SeriesResponse.from(u))).orElse(ResponseEntity.noContent().build());
    }

}
