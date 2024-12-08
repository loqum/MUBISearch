package com.mubisearch.user.rest.controllers;

import com.mubisearch.user.entities.User;
import com.mubisearch.user.rest.dto.Auth0User;
import com.mubisearch.user.rest.dto.UserRegisterRequest;
import com.mubisearch.user.rest.dto.UserResponse;
import com.mubisearch.user.rest.dto.UserUpdateRequest;
import com.mubisearch.user.services.Auth0Service;
import com.mubisearch.user.services.UserService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Log4j2
@RestController
@RequestMapping("api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private Auth0Service auth0Service;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAllUsers() {
        log.info("Init getAllUsers");
        return userService.findAll();
    }

    @GetMapping("/auth0")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Auth0User>> getAllUsersAuth0() {
        log.info("Init getAllUsersAuth0");
        try {
            String token = auth0Service.getManagementToken();
            List<Auth0User> users = auth0Service.findAllUsers(token);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            log.error("Error getting users from Auth0: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/auth0/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Auth0User> getUserAuth0ById(@PathVariable @NotNull String idUser) {
        log.info("Init getUsersAuth0ById");
        String token = auth0Service.getManagementToken();
        return auth0Service.findUserById(token, idUser);
    }

    @DeleteMapping("/auth0/delete/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Auth0User> deleteUserAuth0ById(@PathVariable @NotNull String idUser) {
        log.info("Init deleteUserAuth0ById");
        String token = auth0Service.getManagementToken();
        ResponseEntity<Auth0User> auth0UserResponseEntity = auth0Service.deleteUserById(token, idUser);
        if (auth0UserResponseEntity.getStatusCode().is2xxSuccessful()) {
            userService.deleteUser(idUser);
        }
        return auth0UserResponseEntity;
    }

    @PatchMapping("/auth0/update/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Auth0User> updateUserAuth0ById(@PathVariable @NotNull String idUser, @RequestBody Map<String, String> user) {
        log.info("Init updateUserAuth0ById");
        String token = auth0Service.getManagementToken();
        ResponseEntity<Auth0User> auth0UserResponseEntity = auth0Service.updateUserById(token, idUser, user);
        if (auth0UserResponseEntity.getStatusCode().is2xxSuccessful()) {
            userService.updateUserBySub(idUser, user);
        }
        return auth0UserResponseEntity;
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

    @PutMapping("/update/{idUser}")
    public ResponseEntity<User> updateUser(@PathVariable @NotNull Long idUser, @RequestBody UserUpdateRequest userUpdateRequest) {
        log.info("Init updateUser: {}", userUpdateRequest);
        try {
            User user = userService.updateUserById(idUser, userUpdateRequest);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{idUser}").buildAndExpand(idUser).toUri();
            return ResponseEntity.created(uri).body(user);
        } catch (DataIntegrityViolationException e) {
            log.error("Error updating user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
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
