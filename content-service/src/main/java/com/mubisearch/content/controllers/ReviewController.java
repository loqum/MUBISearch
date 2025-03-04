package com.mubisearch.content.controllers;

import com.mubisearch.content.controllers.dto.ReviewRequest;
import com.mubisearch.content.controllers.dto.ReviewResponse;
import com.mubisearch.content.entities.NotificationType;
import com.mubisearch.content.services.ContentUpdatePublisher;
import com.mubisearch.content.services.ReviewService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
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

    @Autowired
    private ContentUpdatePublisher contentUpdatePublisher;


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

    @GetMapping("/idUser/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ReviewResponse>> getReviewsByIdUser(@PathVariable @NotNull Long idUser) {
        log.info("Init getReviewsByIdUser");
        try {
            return ResponseEntity.ok(reviewService.findByIdUser(idUser).stream().map(ReviewResponse::from).collect(Collectors.toList()));
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

        contentUpdatePublisher.publishContentUpdate(reviewRequest.idUser(), reviewRequest.idContent(), NotificationType.NEW_REVIEW);

        return ResponseEntity.created(uri).body(idReview);
    }

    @DeleteMapping("/delete/{idReview}")
    public ResponseEntity<Boolean> deleteReview(@PathVariable @NotNull Long idReview) {
        log.info("Init deleteReview");
        try {
            reviewService.deleteReview(idReview);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The specified review id " + idReview + " does not exist.", e);
        }
    }
}
