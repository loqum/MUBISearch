package com.mubisearch.user.rest.controllers;

import com.mubisearch.user.entities.User;
import com.mubisearch.user.rest.dto.UserRequest;
import com.mubisearch.user.rest.dto.UserResponse;
import com.mubisearch.user.services.UserService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAllUsers() {
        log.info("Init getAllUsers");
        return userService.findAll();
    }

    @GetMapping("/id/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserResponse> getUserById(@PathVariable @NotNull Long idUser) {
        log.info("Init getUserById");
        return userService.findById(idUser).map(u -> ResponseEntity.ok().body(UserResponse.from(u))).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserResponse> getUserByName(@PathVariable @NotNull String name) {
        log.info("Init getUserByName");
        return userService.findByName(name).map(u -> ResponseEntity.ok().body(UserResponse.from(u))).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public ResponseEntity<User> getOwnUser(@AuthenticationPrincipal User user) {
        log.info("Init getOwnUser");
        return ResponseEntity.ok().body(user);
    }

    @PostMapping
    public ResponseEntity<Long> createUser(@RequestBody UserRequest userRequest) {
        log.info("Init createUser: {}", userRequest);
        try {
            Long idUser = userService.createUser(userRequest).getId();
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(idUser).toUri();
            return ResponseEntity.created(uri).body(idUser);
        } catch (DataIntegrityViolationException e) {
            log.error("Error creating user. User name is duplicated: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

    }

}
