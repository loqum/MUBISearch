package com.mubisearch.user.services;

import com.mubisearch.user.rest.dto.Auth0User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class Auth0Service {

    @Value("${auth0.clientId}")
    private String clientId;

    @Value("${auth0.clientSecret}")
    private String clientSecret;

    @Value("${auth0.domain}")
    private String auth0Domain;

    private final RestTemplate restTemplate;

    public String getManagementToken() {
        String url = "https://" + auth0Domain + "/oauth/token";

        Map<String, String> body = new HashMap<>();
        body.put("client_id", clientId);
        body.put("client_secret", clientSecret);
        body.put("audience", "https://" + auth0Domain + "/api/v2/");
        body.put("grant_type", "client_credentials");

        Map<String, Object> response = restTemplate.postForObject(url, body, Map.class);

        return (String) response.get("access_token");
    }

    public List<Auth0User> getUsers(String token) {
        String url = "https://" + auth0Domain + "/api/v2/users";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<List<Auth0User>> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, new ParameterizedTypeReference<>() {}
        );

        return response.getBody();
    }


}
