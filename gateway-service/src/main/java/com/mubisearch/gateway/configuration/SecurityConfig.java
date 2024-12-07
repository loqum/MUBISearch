package com.mubisearch.gateway.configuration;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
        return auth.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .addFilterBefore(new LoggingFilter(), UsernamePasswordAuthenticationFilter.class)
                .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(request -> {
                    var cors = new org.springframework.web.cors.CorsConfiguration();
                    cors.setAllowedOrigins(java.util.List.of("http://localhost:5173"));
                    cors.setAllowedMethods(java.util.List.of("*"));
                    cors.setAllowedHeaders(java.util.List.of("*"));
                    cors.setAllowCredentials(true);
                    return cors;
                }))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, "api/v1/movies/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "api/v1/series/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "api/v1/users/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "api/v1/favorites/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "api/v1/reviews/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "api/v1/contents/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "api/v1/votes/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "api/v1/notifications/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(new JwtAuthenticationConverter())
                                .decoder(jwtDecoder())
                        )
                )

                .csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        String issuer = "https://mubisearch.eu.auth0.com/";
        String audience = "https://api-mubisearch.local.com";

        NimbusJwtDecoder jwtDecoder = JwtDecoders.fromOidcIssuerLocation(issuer);

        OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
        OAuth2TokenValidator<Jwt> defaultValidator =
                JwtValidators.createDefaultWithIssuer(issuer);

        jwtDecoder.setJwtValidator(new DelegatingOAuth2TokenValidator<>(defaultValidator, audienceValidator));

        return jwtDecoder;
    }

    public static class AudienceValidator implements OAuth2TokenValidator<Jwt> {
        private final String expectedAudience;

        public AudienceValidator(String expectedAudience) {
            this.expectedAudience = expectedAudience;
        }

        @Override
        public OAuth2TokenValidatorResult validate(Jwt jwt) {
            log.info("Validating Audience...");
            log.info("Expected Audience: {}", expectedAudience);
            log.info("Audience in token: {}", jwt.getAudience());
            log.info("JWT Claims: {}", jwt.getClaims());
            log.info("JWT Header: {}", jwt.getHeaders());
            log.info("JWT TokenValue: {}", jwt.getTokenValue());
            log.info("JWT Subject: {}", jwt.getSubject());
            log.info("JWT Issuer: {}", jwt.getIssuer());

            if (jwt.getAudience().contains(expectedAudience)) {
                return OAuth2TokenValidatorResult.success();
            }
            return OAuth2TokenValidatorResult.failure(
                    new OAuth2Error("invalid_token", "Invalid audience", null)
            );
        }
    }




}
