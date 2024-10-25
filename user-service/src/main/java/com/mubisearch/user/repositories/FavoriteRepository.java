package com.mubisearch.user.repositories;

import com.mubisearch.user.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findFavoritesByIdUserAndIdContent(Long idUser, Long idContent);

}
