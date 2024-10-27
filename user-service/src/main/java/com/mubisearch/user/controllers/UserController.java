package com.mubisearch.user.controllers;

import com.mubisearch.user.controllers.dto.UserRequest;
import com.mubisearch.user.controllers.dto.UserResponse;
import com.mubisearch.user.entities.User;
import com.mubisearch.user.services.UserService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAllUsers() {
        log.info("Init getAllUsers");
        return userService.findAll();
    }

    @GetMapping("/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserResponse> getUserById(@PathVariable @NotNull Long idUser) {
        log.info("Init getUserById");
        return userService.findById(idUser).map(u -> ResponseEntity.ok().body(UserResponse.from(u))).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Long> createUser(@RequestBody UserRequest userRequest) {
        log.info("Init createUser: {}", userRequest);
        Long idUser = userService.createUser(userRequest).getId();
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(idUser).toUri();
        return ResponseEntity.created(uri).body(idUser);
    }

}
