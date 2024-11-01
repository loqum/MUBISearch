package com.mubisearch.notification.controllers;

import com.mubisearch.notification.controllers.dto.NotificationRequest;
import com.mubisearch.notification.entities.Notification;
import com.mubisearch.notification.services.NotificationService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

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
}
