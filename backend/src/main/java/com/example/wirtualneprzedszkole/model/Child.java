package com.example.wirtualneprzedszkole.model;

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

    @ManyToMany(mappedBy = "children")
    private List<User> parents;
}
