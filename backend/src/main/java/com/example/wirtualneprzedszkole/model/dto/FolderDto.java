package com.example.wirtualneprzedszkole.model.dto;

import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FolderDto {
    private Long id;
    private String name;
    private String path;
    private String className;
    private List<FileData> fileDataList;
    private Folder parent;
    private List<Folder> childrenFolder;
}
