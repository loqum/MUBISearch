package com.mubisearch.gateway.controller;

import com.mubisearch.gateway.dto.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class GatewayController {

//    private final RestTemplate restTemplate;
//
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
//        String userServiceUrl = "http://user-service/auth/login";
//        ResponseEntity<String> response = restTemplate.postForEntity(userServiceUrl, loginRequest, String.class);
//
//        // Devuelve la respuesta al cliente
//        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
//    }

}
