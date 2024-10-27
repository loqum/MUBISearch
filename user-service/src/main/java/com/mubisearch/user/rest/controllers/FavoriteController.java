package com.mubisearch.user.rest.controllers;

import com.mubisearch.user.rest.dto.FavoriteResponse;
import com.mubisearch.user.entities.Favorite;
import com.mubisearch.user.services.FavoriteService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/favorites")
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
}
