package com.mubisearch.user.rest.controllers;

import com.mubisearch.user.entities.Favorite;
import com.mubisearch.user.rest.dto.FavoriteRequest;
import com.mubisearch.user.rest.dto.FavoriteResponse;
import com.mubisearch.user.services.FavoriteService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping("api/v1/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<Favorite> getAllFavorites() {
        log.info("Init getAllFavorites");
        return favoriteService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<FavoriteResponse> getFavoriteById(@PathVariable @NotNull Long id) {
        log.info("Init getFavoriteById");
        return favoriteService.findById(id).map(favorite -> ResponseEntity.ok().body(FavoriteResponse.from(favorite))).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{idUser}/content/{idContent}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<FavoriteResponse> getFavoriteByIdUserAndIdContent(@PathVariable @NotNull Long idUser, @PathVariable @NotNull Long idContent) {
        log.info("Init getFavoriteByIdUserAndIdContent");
        return favoriteService.findByIdUserAndIdContent(idUser, idContent).map(favorite -> ResponseEntity.ok().body(FavoriteResponse.from(favorite))).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<FavoriteResponse>> getFavoritesByIdUser(@PathVariable @NotNull Long idUser) {
        log.info("Init getFavoritesByIdUser");
        List<FavoriteResponse> favorites = favoriteService.findByIdUser(idUser).stream().map(FavoriteResponse::from).toList();
        if (favorites.isEmpty()) {
            log.error("Favorites from user {} not found", idUser);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/user/{idUser}/notification/{isNotified}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<FavoriteResponse>> getNotificationByIdUser(@PathVariable @NotNull Long idUser, @PathVariable @NotNull Boolean isNotified) {
        log.info("Init getNotificationByIdUser");
        List<FavoriteResponse> favorites = favoriteService.findByIdUserAndNotification(idUser, isNotified).stream().map(FavoriteResponse::from).toList();
        if (favorites.isEmpty()) {
            log.error("Favorites with notification from user {} not found", idUser);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/content/{idContent}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<FavoriteResponse>> getFavoritesByIdContent(@PathVariable @NotNull Long idContent) {
        log.info("Init getFavoritesByIdContent");
        List<FavoriteResponse> favorites = favoriteService.findByIdContent(idContent).stream().map(FavoriteResponse::from).toList();
        if (favorites.isEmpty()) {
            log.error("Favorites from content {} not found", idContent);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(favorites);
    }

    @PostMapping("/create")
    public ResponseEntity<Long> createFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        log.info("Init createFavorite: {}", favoriteRequest);
        try {
            Long idFavorite = favoriteService.createFavorite(favoriteRequest).getId();
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{idFavorite}")
                    .buildAndExpand(idFavorite)
                    .toUri();
            return ResponseEntity.created(uri).body(idFavorite);
        } catch (DataIntegrityViolationException e) {
            log.error("Favorite already exists for user {} and content {}", favoriteRequest.idUser(), favoriteRequest.idContent());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @DeleteMapping("/delete/{idFavorite}")
    public ResponseEntity<Boolean> deleteFavorite(@PathVariable Long idFavorite) {
        log.info("Init deleteFavorite: {}", idFavorite);
        try {
            favoriteService.deleteFavorite(idFavorite);
            return ResponseEntity.status(HttpStatus.OK).body(true);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The specified favorite with ID " + idFavorite + " does not exist.", e);
        }
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Favorite> setNotification(@PathVariable @NotNull Long id, @RequestBody @NotNull Boolean notification) {
        log.info("Init setNotification");
        try {
            ResponseEntity<Favorite> body = ResponseEntity.ok().body(favoriteService.setNotification(id, notification));

            log.info("Notification updated for favorite with ID {}: {}", id, notification);
            return body;
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The specified favorite with ID " + id + " does not exist.", e);
        }
    }
}
