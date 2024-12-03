package com.mubisearch.gateway.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;

@Configuration
@Slf4j
public class RoutingConfig {

    @Value("${app.gateway.controller.url.users}")
    private String userControllerUrl;

    @Value("${app.gateway.controller.url.favorites}")
    private String favoriteControllerUrl;

    @Value("${app.gateway.controller.url.contents}")
    private String contentControllerUrl;

    @Value("${app.gateway.controller.url.series}")
    private String seriesControllerUrl;

    @Value("${app.gateway.controller.url.movies}")
    private String moviesControllerUrl;

    @Value("${app.gateway.controller.url.votes}")
    private String votesControllerUrl;

    @Value("${app.gateway.controller.url.notifications}")
    private String notificationsControllerUrl;

    @Value("${app.gateway.controller.url.reviews}")
    private String reviewsControllerUrl;

    @Value("${app.gateway.remote-servers.userservice}")
    private String userServiceUrl;

    @Value("${app.gateway.remote-servers.contentservice}")
    private String contentServiceUrl;

    @Value("${app.gateway.remote-servers.notificationservice:http://localhost:18083}")
    private String notificationServiceUrl;

    @Bean
    public RouterFunction<ServerResponse> getRoutes() {
        return route("basic_route")
                .filter((request, next) -> {
                    ServerRequest modifiedRequest = ServerRequest.from(request)
                            .headers(headers -> headers.add("X-Role-Token", "ROLE_API_GATEWAY"))
                            .build();
                    return next.handle(modifiedRequest);
                })
                .route(path(userControllerUrl), http(userServiceUrl))
                .route(path(favoriteControllerUrl), http(userServiceUrl))
                .route(path(seriesControllerUrl), http(contentServiceUrl))
                .route(path(contentControllerUrl), http(contentServiceUrl))
                .route(path(moviesControllerUrl), http(contentServiceUrl))
                .route(path(votesControllerUrl), http(contentServiceUrl))
                .route(path(reviewsControllerUrl), http(contentServiceUrl))
                .route(path(notificationsControllerUrl), http(notificationServiceUrl))
                .onError(Exception.class, this::handleException)
                .build();
    }

    private ServerResponse handleException(Throwable throwable, ServerRequest request) {
        log.error("#handleException - failed to run request {}", request.uri(), throwable);
        return ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }


}
