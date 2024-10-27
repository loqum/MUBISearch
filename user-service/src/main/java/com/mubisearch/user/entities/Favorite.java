package com.mubisearch.user.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "favorite")
@Entity
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @Column(name = "id_user", nullable = false)
//    private Long idUser;
    @Column(name = "id_content", nullable = false)
    private Long idContent;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    @Column(name = "notification_alert")
    private boolean notificationAlert;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
}
