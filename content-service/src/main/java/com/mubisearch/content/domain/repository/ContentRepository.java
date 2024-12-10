package com.mubisearch.content.domain.repository;

import com.mubisearch.content.domain.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {
}
