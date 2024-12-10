package com.mubisearch.content.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
public class Content extends ExternalEntity {

    @Id
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "plot")
    private String plot;
    @Column(name = "poster_path")
    private String posterPath;
    @Column(name = "backdrop_path")
    private String backdropPath;
    @Column(name = "average_score", precision = 3, scale = 1, nullable = false)
    private BigDecimal averageScore;
    @OneToMany(mappedBy = "content")
    private List<ContentGenre> genres = new ArrayList<>();
    @OneToMany(mappedBy = "content")
    private List<Review> reviews = new ArrayList<>();
    @OneToMany(mappedBy = "content")
    private List<Vote> votes = new ArrayList<>();

}
