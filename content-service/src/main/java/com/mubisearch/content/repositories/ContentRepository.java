package com.mubisearch.content.repositories;

import com.mubisearch.content.entities.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {
}
