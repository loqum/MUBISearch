package com.mubisearch.content.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
public class Series extends Content {

    @Column(name = "first_air")
    private LocalDate firstAir;
    @Column(name = "origin_country")
    private String originCountry;
    @Column(name = "original_name")
    private String originalName;

}
