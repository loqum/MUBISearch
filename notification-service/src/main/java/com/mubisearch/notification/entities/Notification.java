package com.mubisearch.notification.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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
    @Column(name = "id_notification_type", nullable = false)
    private Long idNotificationType;
    @Column(name = "date_notification", nullable = false)
    private Date dateNotification;

}
