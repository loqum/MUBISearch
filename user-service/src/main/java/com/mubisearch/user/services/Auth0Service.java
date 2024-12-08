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
import org.springframework.web.client.RestTemplate;

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

    public List<Auth0User> findAllUsers(String token) {
        String url = "https://" + auth0Domain + "/api/v2/users";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<List<Auth0User>> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, new ParameterizedTypeReference<>() {}
        );

        List<Auth0User> users = response.getBody();

        if (users != null) {
            for (Auth0User user : users) {
                String rolesUrl = "https://" + auth0Domain + "/api/v2/users/" + user.getUser_id() + "/roles";

                ResponseEntity<List<Role>> rolesResponse = restTemplate.exchange(
                        rolesUrl, HttpMethod.GET, entity, new ParameterizedTypeReference<>() {}
                );

                List<Role> roles = rolesResponse.getBody();
                user.setRoles(roles);
            }
        }

        return users;
    }

    public ResponseEntity<Auth0User> findUserById(String token, @NotNull String idUser) {
        String url = "https://" + auth0Domain + "/api/v2/users/{idUser}";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Auth0User> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    Auth0User.class,
                    idUser
            );

            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException.NotFound e) {
            log.error("Error fetching user by ID", e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error fetching user by ID", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<Auth0User> deleteUserById(String token, @NotNull String idUser) {
        String url = "https://" + auth0Domain + "/api/v2/users/{idUser}";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Auth0User> response = restTemplate.exchange(
                    url,
                    HttpMethod.DELETE,
                    entity,
                    Auth0User.class,
                    idUser
            );

            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException.NotFound e) {
            log.error("Error deleting user by ID", e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error deleting user by ID", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    public ResponseEntity<Auth0User> updateUserById(String token, @NotNull String idUser) {
        String url = "https://" + auth0Domain + "/api/v2/users/{idUser}";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Auth0User> response = restTemplate.exchange(
                    url,
                    HttpMethod.PATCH,
                    entity,
                    Auth0User.class,
                    idUser
            );

            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException.NotFound e) {
            log.error("Error updating user by ID", e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error updating user by ID", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
