package com.mubisearch.content.entities;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "crew_assignment")
public class CrewAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_content")
    private Content content;
    @ManyToOne
    @JoinColumn(name = "id_crew_member")
    private CrewMember crewMember;

}
