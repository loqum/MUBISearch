package com.mubisearch.content.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_user")
    private Long idUser;
    @ManyToOne
    @JoinColumn(name = "id_content")
    private Content content;
    @Column(name = "score")
    private int score;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Vote(Long idUser, Content content, int score) {
        this.idUser = idUser;
        this.content = content;
        this.score = score;
    }

}
