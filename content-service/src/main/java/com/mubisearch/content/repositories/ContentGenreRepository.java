package com.mubisearch.content.repositories;

import com.mubisearch.content.entities.ContentGenre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentGenreRepository extends JpaRepository<ContentGenre, Long> {
}
