package com.example.wirtualneprzedszkole.model.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long classId;
    private String name;
    private String lastName;

    @JsonIgnoreProperties(value = {"children"})
    @ManyToMany(mappedBy = "children")
    private List<User> parents;
}
