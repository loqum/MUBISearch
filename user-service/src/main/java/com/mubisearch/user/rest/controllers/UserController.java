package com.mubisearch.user.rest.controllers;

import com.mubisearch.user.entities.User;
import com.mubisearch.user.rest.dto.UserLoginRequest;
import com.mubisearch.user.rest.dto.UserRegisterRequest;
import com.mubisearch.user.rest.dto.UserResponse;
import com.mubisearch.user.services.UserService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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

    @GetMapping("/sub/{sub}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserResponse> getUserBySub(@PathVariable @NotNull String sub) {
        log.info("Init getUserById");
        return userService.findBySub(sub).map(u -> ResponseEntity.ok().body(UserResponse.from(u))).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserResponse> getUserByName(@PathVariable @NotNull String name) {
        log.info("Init getUserByName");
        return userService.findByName(name).map(u -> ResponseEntity.ok().body(UserResponse.from(u))).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/exists/{sub}")
    public ResponseEntity<Boolean> userExists(@PathVariable String sub) {
        boolean exists = userService.userExists(sub);
        return ResponseEntity.ok(exists);
    }


    @PostMapping("/create")
    public ResponseEntity<Long> create(@RequestBody UserRegisterRequest userRequest) {
        log.info("Init createUser: {}", userRequest);
        try {
            Long idUser = userService.createUser(userRequest).getId();
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(idUser).toUri();
            return ResponseEntity.created(uri).body(idUser);
        } catch (DataIntegrityViolationException e) {
            log.error("Error creating user. User email is duplicated: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

}
