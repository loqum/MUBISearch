package com.mubisearch.content.domain.repository;

import com.mubisearch.content.domain.model.ContentGenre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentGenreRepository extends JpaRepository<ContentGenre, Long> {
}
