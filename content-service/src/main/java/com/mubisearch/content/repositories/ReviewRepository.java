package com.mubisearch.content.repositories;

import com.mubisearch.content.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
