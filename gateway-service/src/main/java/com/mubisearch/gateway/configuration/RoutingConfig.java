package com.mubisearch.gateway.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.stripPrefix;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.method;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;

@Configuration
@Slf4j
public class RoutingConfig {

    @Value("${app.gateway.controller.url.users}")
    private String userControllerUrl;

    @Value("${app.gateway.controller.url.favorites}")
    private String favoriteControllerUrl;

    @Value("${app.gateway.remote-servers.userservice}")
    private String userServiceUrl;

    @Value("${app.gateway.remote-servers.notificationservice:http://localhost:18083}")
    private String notificationServiceUrl;

    @Value("${app.gateway.remote-servers.contentservice:http://localhost:18084}")
    private String contentServiceUrl;

    @Bean
    public RouterFunction<ServerResponse> getHelloWorld() {
        return route("basic_route")
                .route(path(userControllerUrl).and(method(HttpMethod.GET)), http(userServiceUrl))
                .route(path(userControllerUrl).and(method(HttpMethod.PUT)), http(userServiceUrl))
                .route(path(userControllerUrl).and(method(HttpMethod.POST)), http(userServiceUrl))
                .route(path(favoriteControllerUrl).and(method(HttpMethod.GET)), http(userServiceUrl))
                .route(path(favoriteControllerUrl).and(method(HttpMethod.PUT)), http(userServiceUrl))
                .route(path(favoriteControllerUrl).and(method(HttpMethod.POST)), http(userServiceUrl))
                .onError(Exception.class, this::handleException)
                .build();
    }

    private ServerResponse handleException(Throwable throwable, ServerRequest request) {
        log.error("#handleException - failed to run request {}", request.uri(), throwable);

        return ServerResponse
                .status(HttpStatus.INTERNAL_SERVER_ERROR).build();

    }


}
