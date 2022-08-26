package com.example.wirtualneprzedszkole.model.dao;

import com.example.wirtualneprzedszkole.model.dao.Child;
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
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @OneToMany
    @JoinColumn(name = "classId")
    private List<Child> children;

    @JsonIgnoreProperties(value = {"classes"})
    @ManyToMany(mappedBy = "classes")
    private List<User> teachers;
}
