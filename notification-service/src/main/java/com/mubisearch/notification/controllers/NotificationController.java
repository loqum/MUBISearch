package com.mubisearch.notification.controllers;

import com.mubisearch.notification.controllers.dto.NotificationRequest;
import com.mubisearch.notification.controllers.dto.NotificationResponse;
import com.mubisearch.notification.entities.Notification;
import com.mubisearch.notification.services.NotificationService;
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
@RequestMapping("api/v1/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<Notification> getAllNotifications() {
        log.info("Init getAllNotifications");
        return notificationService.findAll();
    }

    @GetMapping("/idUser/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<NotificationResponse>> getNotificationsByIdUser(@PathVariable Long idUser) {
        log.info("Init getNotificationsByIdUser");
        try {
            return ResponseEntity.ok(notificationService.findByIdUser(idUser).stream().map(NotificationResponse::from).collect(Collectors.toList()));
        } catch (Exception e) {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createNotification(@RequestBody NotificationRequest notificationRequest) {
        log.info("Init createNotification");
        String idNotification = notificationService.createNotification(notificationRequest).getId().toString();
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(idNotification)
                .toUri();
        return ResponseEntity.created(uri).body(idNotification);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteNotification(@PathVariable @NotNull Long id) {
        log.info("Init deleteReview");
        try {
            notificationService.deleteNotification(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The specified notification with id " + id + " does not exist.", e);
        }
    }
}
