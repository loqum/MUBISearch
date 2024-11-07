package com.mubisearch.content.controllers;

import com.mubisearch.content.controllers.dto.BaseDto;
import com.mubisearch.content.controllers.dto.SeriesDto;
import com.mubisearch.content.services.SeriesService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("api/v1/series")
public class SeriesController {

    @Autowired
    private SeriesService seriesService;

    @GetMapping("/title/{title}")
    @ResponseStatus(HttpStatus.OK)
    public BaseDto<SeriesDto> getSeriesByTitle(@PathVariable @NotNull String title) {
        log.info("Init getSeriesByTitle");
        if (seriesService.getSeries(title).isEmpty()) {
            return new BaseDto<>(false, List.of());
        } else {
            return new BaseDto<>(true, seriesService.getSeries(title));
        }
    }

    @GetMapping("/discover")
    @ResponseStatus(HttpStatus.OK)
    public BaseDto<SeriesDto> getSeriesDiscover() {
        log.info("Init getSeriesDiscover");
        if (seriesService.getSeriesDiscover().isEmpty()) {
            return new BaseDto<>(false, List.of());
        } else {
            return new BaseDto<>(true, seriesService.getSeriesDiscover());
        }
    }

}
