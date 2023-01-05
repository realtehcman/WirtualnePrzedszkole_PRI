package com.example.wirtualneprzedszkole.controller;


import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/*import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;*/
import com.example.wirtualneprzedszkole.filemanagement.UploadFileResponse;
import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.Nullable;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RestController
@RequiredArgsConstructor
@RequestMapping(value = "api/file", method = RequestMethod.POST)
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    private final StorageService storageService;

    @PostMapping("/uploadFile/{folderId}")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file, @PathVariable Long folderId/*, @Nullable @RequestPart("folder") String folder*/) {
        FileData fileData = storageService.store(file, folderId /*folder*/);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path("folderId/")
                .path(fileData.getHash() + ".fileExtension")
                .toUriString();

        return new UploadFileResponse(fileData.getName(), fileDownloadUri, file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultiFiles/{folderId}")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("file") MultipartFile[] files, @PathVariable Long folderId/*, @RequestPart("folder") String folder*/) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file, folderId))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/downloadFile/{folderId}/{fileName:.+}")
    public void deleteFile(@PathVariable String fileName, @PathVariable Long folderId) {
        if (storageService.delete(fileName, folderId)) {
            System.out.println("deleting " + fileName);
        }
    }

    @DeleteMapping("/downloadFile/{folderId}/")
    public void deleteAllRecursively(@PathVariable Long folderId) {
        if (storageService.deleteAllService(folderId)) {
            System.out.println("deleting everything folder id " + folderId.toString());

        }
    }


    @GetMapping("/downloadFile/{folderId}/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, @PathVariable Long folderId, HttpServletRequest request) {
        Resource resource = storageService.loadAsResource(fileName, folderId);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException exception) {
            logger.info("Could not determine file type.");
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        System.out.println(resource);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/downloadFolder/{folderId}")
    public ResponseEntity<StreamingResponseBody> downloadFolder(@PathVariable Long folderId, HttpServletResponse response) throws IOException {
        List<Resource> resources = storageService.loadAsResources(folderId);

        StreamingResponseBody streamingResponseBody = out -> {
            ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream());

            for (Resource resource : resources) {
                System.out.println(resource);
                ZipEntry zipEntry = new ZipEntry(Objects.requireNonNull(resource.getFilename()));
                zipEntry.setSize(resource.contentLength());
                zipOutputStream.putNextEntry(zipEntry);
                StreamUtils.copy(resource.getInputStream(), zipOutputStream);
                zipOutputStream.closeEntry();
            }

            zipOutputStream.finish();
            zipOutputStream.close();
        };
        response.setContentType("application/zip");
        response.setHeader("Content-Disposition", "attachment; filename=example.zip");

        return ResponseEntity.ok(streamingResponseBody);
    }
}