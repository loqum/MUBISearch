package com.mubisearch.content.repositories;

import com.mubisearch.content.entities.Series;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeriesRepository extends JpaRepository<Series, Long> {
}
