package com.mubisearch.user.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mubisearch.user.rest.error.ApiError;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;

@Component
@RequiredArgsConstructor
@Log4j2
public class CustomBasicAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {

    private final ObjectMapper mapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.addHeader("WWW-Authenticate", "Basic realm=" + getRealmName() + "\"");
        response.setContentType("application/json");
        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, authException.getMessage());
        String strApiError = mapper.writeValueAsString(apiError);

        PrintWriter writer = response.getWriter();
        writer.println(strApiError);
    }

    @Override
    public void afterPropertiesSet() {
        setRealmName("MUBISearchRealm");
        super.afterPropertiesSet();
    }
}
