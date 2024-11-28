package com.mubisearch.notification.repositories;

import com.mubisearch.notification.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByIdUser(Long idUser);
}
