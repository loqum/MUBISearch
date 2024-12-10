package com.mubisearch.content.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mubisearch.content.adapters.incoming.event.VoteListener;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@EntityListeners(VoteListener.class)
public class Vote extends ExternalEntity {

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

    public Vote(Long idUser, Content content, int score) {
        this.idUser = idUser;
        this.content = content;
        this.score = score;
    }

}
