package com.mubisearch.content.repositories;

import com.mubisearch.content.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
