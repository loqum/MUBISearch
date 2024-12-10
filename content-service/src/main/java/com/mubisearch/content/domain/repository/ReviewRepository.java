package com.mubisearch.content.domain.repository;

import com.mubisearch.content.domain.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByContent_Id(Long contentId);
    List<Review> findByIdUser(Long idUser);
}
