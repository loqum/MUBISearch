package com.mubisearch.user.services;

import com.mubisearch.user.entities.Favorite;
import com.mubisearch.user.entities.User;
import com.mubisearch.user.repositories.FavoriteRepository;
import com.mubisearch.user.repositories.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

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
        User user = userRepository.findById(favorite.idUser()).orElseThrow(() -> new IllegalArgumentException("User with id: " + favorite.idUser() + " not found"));
        Favorite newFavorite = Favorite.builder().user(user).notificationAlert(false).createdAt(LocalDateTime.now()).idContent(favorite.idContent()).build();

        Favorite savedFavorite = favoriteRepository.save(newFavorite);
        user.getFavorites().add(savedFavorite);

        return savedFavorite;
    }

    public Favorite setNotification(Long id, boolean notification) {
        Favorite favorite = favoriteRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Favorite with id: " + id + " not found"));
        favorite.setNotificationAlert(notification);
        return favoriteRepository.save(favorite);
    }

    public boolean existsUserAndContent(Long userId, Long idContent) {
        return favoriteRepository.existsByUser_IdAndIdContent(userId, idContent);
    }

    public void deleteFavorite(Long id) {
        favoriteRepository.deleteById(id);
    }

}
