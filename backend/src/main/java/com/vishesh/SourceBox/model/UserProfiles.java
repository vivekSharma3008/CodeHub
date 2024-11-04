package com.vishesh.SourceBox.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="user_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfiles {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    private String fullName;
    private String avatar;
    private String bio;
    private String preferences;

}
