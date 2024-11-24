package com.mubisearch.content.controllers;

import com.mubisearch.content.controllers.dto.ReviewRequest;
import com.mubisearch.content.controllers.dto.ReviewResponse;
import com.mubisearch.content.services.ReviewService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping("api/v1/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;


    @GetMapping("/idContent/{idContent}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ReviewResponse>> getReviewsByIdContent(@PathVariable @NotNull Long idContent) {
        log.info("Init getContentById");
        try {
            return ResponseEntity.ok(reviewService.findByIdContent(idContent).stream().map(ReviewResponse::from).collect(Collectors.toList()));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createReview(@RequestBody ReviewRequest reviewRequest) {
        log.info("Init createReview");
        String idReview = reviewService.createReview(reviewRequest).getId().toString();
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{idReview}")
                .buildAndExpand(idReview)
                .toUri();

        return ResponseEntity.created(uri).body(idReview);
    }
}
