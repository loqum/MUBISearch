package com.mubisearch.user.repositories;

import com.mubisearch.user.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findFavoritesByIdUser(Long idUser);
    List<Favorite> findFavoritesByIdContent(Long idContent);
    Optional<Favorite> findFavoriteByIdUserAndIdContent(Long idUser, Long idContent);
    Optional<Favorite> findFavoriteById(Long id);

}
