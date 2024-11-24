package com.mubisearch.content.services;

import com.mubisearch.content.controllers.dto.ReviewRequest;
import com.mubisearch.content.entities.Content;
import com.mubisearch.content.entities.Review;
import com.mubisearch.content.repositories.ContentRepository;
import com.mubisearch.content.repositories.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ContentRepository contentRepository;

    public List<Review> findByIdContent(Long idContent) {
        return reviewRepository.findByContent_Id(idContent);
    }

    public Review createReview(ReviewRequest request) {
        Content content = contentRepository.findById(request.idContent()).orElseThrow(() -> new RuntimeException("Content not found"));
        Review review = Review.builder()
                .idUser(request.idUser())
                .content(content)
                .text(request.text())
                .createdAt(LocalDateTime.now())
                .build();

        return reviewRepository.save(review);
    }



}
