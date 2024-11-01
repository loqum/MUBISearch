package com.mubisearch.content.controllers;

import com.mubisearch.content.controllers.dto.ContentRequest;
import com.mubisearch.content.controllers.dto.ContentResponse;
import com.mubisearch.content.entities.Content;
import com.mubisearch.content.services.ContentService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("api/v1/contents")
public class ContentController {

    @Autowired
    private ContentService contentService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<Content> getAllContents() {
        log.info("Init getAllContents");
        return contentService.findAll();
    }

    @GetMapping("/id/{idContent}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ContentResponse> getContentById(@PathVariable @NotNull Long idContent) {
        log.info("Init getContentById");
        return contentService.findById(idContent).map(u -> ResponseEntity.ok().body(ContentResponse.from(u))).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> createContent(@RequestBody ContentRequest contentRequest) {
        log.info("Init createContent");
        String idContent = contentService.createContent(contentRequest).getId().toString();
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{idContent}")
                .buildAndExpand(idContent)
                .toUri();
        return ResponseEntity.created(uri).body(idContent);
    }
}
