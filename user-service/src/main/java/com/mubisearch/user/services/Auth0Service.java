package com.mubisearch.user.services;

import com.mubisearch.user.rest.dto.Auth0User;
import com.mubisearch.user.rest.dto.Role;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class Auth0Service {

    @Value("${auth0.clientId}")
    private String clientId;

    @Value("${auth0.clientSecret}")
    private String clientSecret;

    @Value("${auth0.domain}")
    private String auth0Domain;

    @Value("${auth0.api.users}")
    private String usersApiUrl;

    private final WebClient webClient;

    public String getManagementToken() {
        Map<String, String> body = new HashMap<>();
        body.put("client_id", clientId);
        body.put("client_secret", clientSecret);
        body.put("audience", "https://" + auth0Domain + "/api/v2/");
        body.put("grant_type", "client_credentials");

        Map<String, Object> response = webClient
                .post()
                .uri("/oauth/token")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .block();

        if (response == null) {
            log.error("Error fetching token");
            throw new RuntimeException("Error fetching token");
        }

        return (String) response.get("access_token");
    }

    public List<Auth0User> findAllUsers(String token) {
        List<Auth0User> users = webClient
                .get()
                .uri(usersApiUrl)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Auth0User>>() {})
                .block();

        if (users != null) {
            for (Auth0User user : users) {
                List<Role> roles = webClient
                        .get()
                        .uri(usersApiUrl + "/" + user.getUser_id() + "/roles")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .retrieve()
                        .bodyToMono(new ParameterizedTypeReference<List<Role>>() {})
                        .block();
                user.setRoles(roles);
            }
        }
        return users;
    }

    public ResponseEntity<Auth0User> findUserById(String token, @NotNull String idUser) {
        try {
            Auth0User response = webClient.get()
                    .uri(usersApiUrl + "/{idUser}", idUser)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .retrieve()
                    .bodyToMono(Auth0User.class)
                    .block();
            return ResponseEntity.ok(response);
        } catch (HttpClientErrorException.NotFound e) {
            log.error("Error fetching user by ID", e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error fetching user by ID", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<Auth0User> deleteUserById(String token, @NotNull String idUser) {
        try {
            Auth0User response = webClient.delete()
                    .uri(usersApiUrl + "/{idUser}", idUser)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .retrieve()
                    .bodyToMono(Auth0User.class)
                    .block();
            return ResponseEntity.ok(response);
        } catch (HttpClientErrorException.NotFound e) {
            log.error("Error deleting user by ID", e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error deleting user by ID", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    public ResponseEntity<Auth0User> updateUserById(String token, @NotNull String idUser, Map<String, String> user) {
        try {
            Auth0User response = webClient.patch()
                    .uri(usersApiUrl + "/{idUser}", idUser)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .bodyValue(user)
                    .retrieve()
                    .bodyToMono(Auth0User.class)
                    .block();
            return ResponseEntity.ok(response);
        } catch (HttpClientErrorException.NotFound e) {
            log.error("Error updating user by ID", e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error updating user by ID", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
