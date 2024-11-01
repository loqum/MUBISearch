package com.mubisearch.content.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mubisearch.content.controllers.dto.SearchResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

@Slf4j
public abstract class BaseService<T> {

    @Value("${tmdb.auth.key}")
    private String authKey;

    private final RestTemplate restTemplate = new RestTemplate();

    protected <T> T fetchData(String urlTemplate, Map<String, String> params, TypeReference<T> typeReference) {
        String url = getUrl(urlTemplate, params);

        try {
            ResponseEntity<String> response = getHeaders(url);

            if (response.getStatusCode() != HttpStatus.OK) {
                log.error("Error fetching data from TMDB: {}", response.getBody());
                return null;
            } else {
                ObjectMapper mapper = new ObjectMapper();
                return mapper.readValue(response.getBody(), typeReference);
            }
        } catch (Exception e) {
            log.error("Error fetching data from TMDB", e);
        }
        return null;
    }

    private String getUrl(String urlTemplate, Map<String, String> params) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromUriString(urlTemplate);

        if (params != null) {
            params.forEach(uriComponentsBuilder::queryParam);
        }

        UriComponents uriComponents = uriComponentsBuilder.buildAndExpand(params != null ? params : Map.of());
        return uriComponents.toUriString();
    }

    private ResponseEntity<String> getHeaders(String url) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + authKey);
        headers.set("Accept", "application/json");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        return restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
    }

}
