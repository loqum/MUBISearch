package com.mubisearch.gateway.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomBasicAuthenticationEntryPoint customBasicAuthenticationEntryPoint;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
        return auth.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(HttpMethod.GET, "/users/**", "/favorites/**").authenticated()
//                        .requestMatchers(HttpMethod.POST, "/users/**", "/favorites/**").hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.PUT, "/users/**", "/favorites/**").hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.DELETE, "/users/**", "/favorites/**").hasRole("ADMIN")
//                        .anyRequest().authenticated()
                                .anyRequest().permitAll()
//                )
//                .httpBasic(Customizer.withDefaults())
//                .exceptionHandling( exceptionHandling ->
//                        exceptionHandling
//                                .authenticationEntryPoint(customBasicAuthenticationEntryPoint)
                )
                .csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    public ResponseEntity<String> authenticateUser(String username, String password) {
        String url = "http://localhost:8081/api/v1/auth"; // Ajusta la URL según sea necesario
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        String jsonRequest = String.format("{\"name\": \"%s\", \"password\": \"%s\"}", username, password);
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonRequest, headers);

        return restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
    }


}
