package com.mubisearch.content.domain.repository;

import com.mubisearch.content.domain.model.Series;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeriesRepository extends JpaRepository<Series, Long> {
}
