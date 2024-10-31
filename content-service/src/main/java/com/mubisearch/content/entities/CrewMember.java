package com.mubisearch.content.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "crew_member")
public class CrewMember extends ExternalEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "known_for")
    private String knownFor;
    @Column(name = "role")
    private String role;
    @Column(name = "image")
    private String image;
    @Column(name = "biography")
    private String biography;

    @OneToMany(mappedBy = "crewMember")
    private List<CrewAssignment> crewAssignments = new ArrayList<>();

}
