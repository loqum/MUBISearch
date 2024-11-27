package com.mubisearch.user.repositories;

import com.mubisearch.user.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findFavoritesByUserId(Long idUser);
    List<Favorite> findFavoritesByIdContent(Long idContent);
    List<Favorite> findFavoritesByUserIdAndNotificationAlert(Long idUser, boolean notification);
    Optional<Favorite> findFavoriteByUserIdAndIdContent(Long idUser, Long idContent);
    Optional<Favorite> findFavoriteById(Long id);
    boolean existsByUser_IdAndIdContent(Long userId, Long idContent);

}
