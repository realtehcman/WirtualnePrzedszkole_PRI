package com.example.wirtualneprzedszkole.controller;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.*;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/*import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;*/
import com.example.wirtualneprzedszkole.filemanagement.UploadFileResponse;
import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.model.dto.AddDescriptionDto;
import com.example.wirtualneprzedszkole.service.FileDataService;
import com.example.wirtualneprzedszkole.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.util.ReflectionUtils;
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
    private final FileDataService fileDataService;

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

    @DeleteMapping("/deleteFile/{folderId}/{fileName:.+}")
    public void deleteFile(@PathVariable String fileName, @PathVariable Long folderId) {
        if (storageService.delete(fileName, folderId)) {
            System.out.println("deleting " + fileName);
        }
    }

    @DeleteMapping("/deleteAllFiles/{folderId}")
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

        int BUFFER_SIZE = 1024;


        StreamingResponseBody streamingResponseBody = out -> {
            final ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream());
            try {
                for (Resource resource : resources) {
                    final InputStream inputStream = new FileInputStream(resource.getFile());
                    final ZipEntry zipEntry = new ZipEntry(Objects.requireNonNull(resource.getFilename()));
                    zipOutputStream.putNextEntry(zipEntry);
                    byte[] bytes=new byte[BUFFER_SIZE];
                    int length;
                    while ((length=inputStream.read(bytes)) >= 0) {
                        zipOutputStream.write(bytes, 0, length);
                    }
                    inputStream.close();

                    /*System.out.println(resource);
                    ZipEntry zipEntry = new ZipEntry(Objects.requireNonNull(resource.getFilename()));
                    zipEntry.setSize(resource.contentLength());
                    zipOutputStream.putNextEntry(zipEntry);
                    StreamUtils.copy(resource.getInputStream(), zipOutputStream);
                    zipOutputStream.closeEntry();*/
                }
                zipOutputStream.close();
            } catch (IOException exception) {
                logger.error("Exception while reading and streaming data {} ", exception);
            } finally {
                zipOutputStream.close();
            }

            /*zipOutputStream.finish();
            zipOutputStream.close();*/
        };

        response.setContentType("application/zip");
        response.setHeader("Content-Disposition", "attachment; filename=example.zip");

        return ResponseEntity.ok(streamingResponseBody);
    }

    @GetMapping("/downloadKnowledge")
    public ResponseEntity<List<FileData>> downloadKnowledge() {
        Long knowledgeId = 0L;
        List<Resource> resources = storageService.loadAsResources(knowledgeId);
        //List<String> filesNames = new ArrayList<>();
        //Map<String, FileData> filesInfo = new HashMap<>();
        List<FileData> filesInfo = new ArrayList<>();
        for (Resource resource : resources) {
            //filesNames.add(resource.getFilename());
            try {
                filesInfo.add(fileDataService.getFile(resource.getFile().getAbsolutePath()));
            } catch (IOException exception) {
                exception.printStackTrace();
            }
        }

        return ResponseEntity.ok(filesInfo);
    }

    @PatchMapping("/patchFile/{fileId}")
    public ResponseEntity<FileData> addFileDescription(@PathVariable Long fileId, @RequestBody AddDescriptionDto addDescriptionDto) {
        try {
            FileData file = fileDataService.findById(fileId);
            file.setDescription(addDescriptionDto.getDescription());

            //file.setDescription(description);
            return new ResponseEntity<FileData>(fileDataService.addFileDescription(file)
                    , HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}