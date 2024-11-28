package com.mubisearch.user.services;

import com.mubisearch.user.entities.Favorite;
import com.mubisearch.user.entities.User;
import com.mubisearch.user.repositories.FavoriteRepository;
import com.mubisearch.user.repositories.UserRepository;
import com.mubisearch.user.rest.dto.FavoriteRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StringRedisTemplate redisTemplate;


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

    public List<Favorite> findByIdUserAndNotification(Long idUser, boolean notification) {
        return favoriteRepository.findFavoritesByUserIdAndNotificationAlert(idUser, notification);
    }

    public Optional<Favorite> findById(Long id) {
        return favoriteRepository.findFavoriteById(id);
    }

    public Favorite createFavorite(FavoriteRequest favorite) {
        User user = userRepository.findById(favorite.idUser()).orElseThrow(() -> new IllegalArgumentException("User with id: " + favorite.idUser() + " not found"));
        Favorite newFavorite = Favorite.builder().user(user).notificationAlert(false).createdAt(LocalDateTime.now()).idContent(favorite.idContent()).build();

        return favoriteRepository.save(newFavorite);
    }

    public Favorite setNotification(Long id, boolean notification) {
        Favorite favorite = favoriteRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Favorite with id: " + id + " not found"));
        favorite.setNotificationAlert(notification);
        favoriteRepository.save(favorite);

        Long idUser = Objects.requireNonNull(favorite.getUser().getId());
        Long idContent = favorite.getIdContent();

        String redisKey = "notifications:content:" + idContent;

        if (notification) {
            redisTemplate.opsForHash().put(redisKey, String.valueOf(idUser), "true");
            log.info("User {} has been alerted for content {}", idUser, idContent);
        } else {
            redisTemplate.opsForHash().delete(redisKey, String.valueOf(idUser));
            log.info("User {} has been unalerted for content {}", idUser, idContent);
        }

        return favorite;
    }

    public boolean existsUserAndContent(Long userId, Long idContent) {
        return favoriteRepository.existsByUser_IdAndIdContent(userId, idContent);
    }

    public void deleteFavorite(Long id) {
        favoriteRepository.deleteById(id);
    }

}
