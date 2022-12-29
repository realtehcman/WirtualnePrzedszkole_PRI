package com.example.wirtualneprzedszkole.controller;


import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/*import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;*/
import com.example.wirtualneprzedszkole.filemanagement.FileStorageProperties;
import com.example.wirtualneprzedszkole.filemanagement.UploadFileResponse;
import com.example.wirtualneprzedszkole.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.Nullable;
import javax.servlet.http.HttpServletRequest;
/*import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.wirtualneprzedszkole.filemanagement.StorageFileNotFoundException;
import com.example.wirtualneprzedszkole.service.StorageService;*/

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "api/file", method = RequestMethod.POST)
public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    private final StorageService storageService;

    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestPart("file") MultipartFile file, @Nullable @RequestPart("folder") String folder) {
        String fileName = storageService.store(file, folder);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultiFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("file") MultipartFile[] files, @RequestPart("folder") String folder) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file, folder))
                .collect(Collectors.toList());
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

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"" )
                .body(resource);
    }

    /*private final StorageService storageService;

    @Autowired
    public FileUploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/")
    public String listUploadedFiles(Model model) throws IOException {

        model.addAttribute("files", storageService.loadAll().map(
                        path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                                "serveFile", path.getFileName().toString()).build().toUri().toString())
                .collect(Collectors.toList()));

        return "uploadForm";
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping("/")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        storageService.store(file);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");

        return "redirect:/";
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }*/

}