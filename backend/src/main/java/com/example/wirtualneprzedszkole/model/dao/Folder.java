package com.example.wirtualneprzedszkole.model.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "folder")
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String path;
    private String className;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "folderId")
    private List<FileData> fileDataList;

    @ManyToOne
    private Folder parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Folder> childrenFolder;

    @JsonIgnore
    public List<Folder> getChildrenFolder() {
        return childrenFolder;
    }
}
