package com.example.wirtualneprzedszkole.filemanagement;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UploadFileResponse {
    private Long id;
    private String name;
    private String hash;
    private Timestamp dateAdded ;
    private String description;
    //private long size;
}
