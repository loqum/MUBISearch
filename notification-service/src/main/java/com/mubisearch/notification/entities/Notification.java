package com.mubisearch.notification.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_user", nullable = false)
    private Long idUser;
    @Column(name = "id_content", nullable = false)
    private Long idContent;
    @Column(name = "notification_type")
    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    @Column(name = "description", nullable = false)
    private String description;

}
