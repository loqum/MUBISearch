package com.mubisearch.content.domain.repository;

import com.mubisearch.content.domain.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
