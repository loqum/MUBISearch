package com.mubisearch.content.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "plot")
    private String plot;
    @Column(name = "poster_path")
    private String posterPath;
    @OneToMany(mappedBy = "content")
    private List<ContentGenre> genres = new ArrayList<>();
    @OneToMany(mappedBy = "content")
    private List<CrewAssignment> crewAssignments = new ArrayList<>();
    @OneToMany(mappedBy = "content")
    private List<Review> reviews = new ArrayList<>();
    @OneToMany(mappedBy = "content")
    private List<Vote> votes = new ArrayList<>();

}
