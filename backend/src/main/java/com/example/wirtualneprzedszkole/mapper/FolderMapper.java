package com.example.wirtualneprzedszkole.mapper;

import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.example.wirtualneprzedszkole.model.dto.FolderDto;

import java.util.List;
import java.util.stream.Collectors;

public class FolderMapper {

    private FolderMapper() {}

    public static List<Folder> FolderDtoMapToFolder(List<FolderDto> folderDtoList) {
        return folderDtoList.stream()
                .map(FolderMapper::FolderDtoMapToFolder)
                .collect(Collectors.toList());
    }

    public static Folder FolderDtoMapToFolder(FolderDto folderDto) {
        return Folder.builder()
                .id(folderDto.getId())
                .name(folderDto.getName())
                .className(folderDto.getClassName())
                .path(folderDto.getPath())
                .parent(folderDto.getParent())
                .childrenFolder(folderDto.getChildrenFolder())
                .fileDataList(folderDto.getFileDataList())
                .build();
    }


    public static List<FolderDto> FolderMapToDto(List<Folder> folders) {
        return folders.stream()
                .map(FolderMapper::FolderMapToDto)
                .collect(Collectors.toList());
    }

    public static FolderDto FolderMapToDto(Folder folder) {
        return FolderDto.builder()
                .id(folder.getId())
                .name(folder.getName())
                .className(folder.getClassName())
                .path(folder.getPath())
                .parent(folder.getParent())
                .childrenFolder(folder.getChildrenFolder())
                .fileDataList(folder.getFileDataList())
                .build();
    }
}
