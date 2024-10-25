package com.mubisearch.user.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Favorite")
@Entity
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_user", nullable = false)
    private Long idUser;
    @Column(name = "id_content", nullable = false)
    private Long idContent;
    @Column(name = "date_favorite", nullable = false)
    private Date dateFavorite;
    @Column(name = "notification_alert")
    private boolean notificationAlert;
}
