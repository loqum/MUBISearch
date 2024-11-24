package com.mubisearch.content.repositories;

import com.mubisearch.content.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByContent_Id(Long contentId);
}
