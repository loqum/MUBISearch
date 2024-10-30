package com.mubisearch.user.rest.controllers;

import com.mubisearch.user.entities.User;
import com.mubisearch.user.services.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    @GetMapping("/me")
    public ResponseEntity<User> getOwnUser(@AuthenticationPrincipal User user) {
        log.info("Init getOwnUser");
        return ResponseEntity.ok().body(user);
    }


}
