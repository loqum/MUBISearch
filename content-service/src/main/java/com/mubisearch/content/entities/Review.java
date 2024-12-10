package com.mubisearch.content.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
public class Review extends ExternalEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_user")
    private Long idUser;
    @ManyToOne
    @JoinColumn(name = "id_content")
    @JsonIgnore
    private Content content;
    @Column(name = "text")
    private String text;

    public Review(Long idUser, Content content, String text) {
        this.idUser = idUser;
        this.content = content;
        this.text = text;
    }
}
