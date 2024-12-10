package com.mubisearch.content.adapters.incoming.rest;

import com.mubisearch.content.application.dto.ContentResponse;
import com.mubisearch.content.domain.model.Content;
import com.mubisearch.content.domain.service.ContentService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return contentService.findById(idContent)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

}
