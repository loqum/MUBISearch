package com.mubisearch.notification.services;

import com.mubisearch.notification.controllers.dto.NotificationRequest;
import com.mubisearch.notification.entities.Notification;
import com.mubisearch.notification.entities.NotificationType;
import com.mubisearch.notification.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class NotificationService {

    @Value("${user.service.url}")
    private String userServiceUrl;

    @Value("${content.service.url}")
    private String contentServiceUrl;

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> findAll() {
        return notificationRepository.findAll();
    }

    public Notification createNotification(NotificationRequest notificationRequest) {
        Notification notification = Notification.builder()
                .idUser(notificationRequest.idUser())
                .idContent(notificationRequest.idContent())
                .notificationType(notificationRequest.type())
                .description(notificationRequest.description())
                .build();
        if (!userExists(notification.getIdUser())) {
            throw new IllegalArgumentException("User with id " + notification.getIdUser() + " does not exist");
        }
        if (!contentExists(notification.getIdContent())) {
            throw new IllegalArgumentException("Content with id " + notification.getIdContent() + " does not exist");
        }
        return notificationRepository.save(notification);
    }

    private boolean userExists(Long idUser) {
        return checkEntityExists(userServiceUrl, idUser);
    }

    private boolean contentExists(Long idContent) {
        return checkEntityExists(contentServiceUrl, idContent);
    }

    private boolean checkEntityExists(String url, Long id) {
        String uri = UriComponentsBuilder.fromUriString(url).buildAndExpand(id).toUriString();
        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (HttpClientErrorException.NotFound e) {
            return false;
        }
    }


}
