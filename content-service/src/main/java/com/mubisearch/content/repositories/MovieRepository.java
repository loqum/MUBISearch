package com.mubisearch.content.repositories;

import com.mubisearch.content.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    Optional<Movie> findByIdExternal(Long idExternal);
}
