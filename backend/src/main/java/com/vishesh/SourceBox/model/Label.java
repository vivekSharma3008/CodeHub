package com.vishesh.SourceBox.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Label {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String color;

    private String description;

    private LocalDateTime creationDate;

    @ManyToOne
    @JoinColumn(name="creator_id")
    private User creator;

    private int usageCount;

    private boolean isVisible;

}
