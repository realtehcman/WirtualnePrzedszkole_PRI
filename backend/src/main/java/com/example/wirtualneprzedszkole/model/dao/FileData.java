package com.example.wirtualneprzedszkole.model.dao;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "file_data")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String hash;
    private String path;
    private Long folderId;
    private Timestamp dateAdded;
    //private String type;
}
