package com.mubisearch.content.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "content_genre")
public class ContentGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_content")
    @JsonIgnore
    private Content content;
    @Enumerated(EnumType.STRING)
    @Column(name = "genre")
    private Genre genre;

    public ContentGenre(Content content, Genre genre) {
        this.content = content;
        this.genre = genre;
    }
}
