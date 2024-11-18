package com.mubisearch.user.services;

import com.mubisearch.user.entities.Favorite;
import com.mubisearch.user.repositories.FavoriteRepository;
import com.mubisearch.user.rest.dto.FavoriteRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    public List<Favorite> findAll() {
        return favoriteRepository.findAll();
    }

    public Optional<Favorite> findByIdUserAndIdContent(Long idUser, Long idContent) {
        return favoriteRepository.findFavoriteByUserIdAndIdContent(idUser, idContent);
    }

    public List<Favorite> findByIdUser(Long idUser) {
        return favoriteRepository.findFavoritesByUserId(idUser);
    }

    public List<Favorite> findByIdContent(Long idContent) {
        return favoriteRepository.findFavoritesByIdContent(idContent);
    }

    public Optional<Favorite> findById(Long id) {
        return favoriteRepository.findFavoriteById(id);
    }

    public Favorite createFavorite(FavoriteRequest favorite) {
        Favorite newFavorite = Favorite.builder().user(favorite.user()).notificationAlert(false).createdAt(LocalDateTime.now()).idContent(favorite.idContent()).build();
        return favoriteRepository.save(newFavorite);
    }

    public Favorite setNotification(Long id, @RequestBody Boolean isNotificationActive) {
        Favorite favorite = favoriteRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Favorite with id: " + id + " not found"));
        favorite.setNotificationAlert(isNotificationActive);
        return favorite;
    }

    public Favorite updateFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

}
