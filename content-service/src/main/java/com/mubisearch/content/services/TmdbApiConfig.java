package com.mubisearch.content.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class TmdbApiConfig {

    @Value("${tmdb.api.url.search.movie.discover}")
    private String discoverMoviesUrl;

    public String getDiscoverMoviesUrl(int page) {
        return UriComponentsBuilder.fromHttpUrl(discoverMoviesUrl)
                .queryParam("include_adult", false)
                .queryParam("include_video", false)
                .queryParam("language", "es-ES")
                .queryParam("page", page)
                .queryParam("sort_by", "popularity.desc")
                .toUriString();
    }
}
