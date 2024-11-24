package com.mubisearch.content.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mubisearch.content.services.VoteListener;
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
@EntityListeners(VoteListener.class)
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_user")
    private Long idUser;
    @ManyToOne
    @JoinColumn(name = "id_content")
    @JsonIgnore
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
