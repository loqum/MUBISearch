package com.mubisearch.content.services;

import com.mubisearch.content.controllers.dto.ContentRequest;
import com.mubisearch.content.entities.Content;
import com.mubisearch.content.repositories.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    public List<Content> findAll() {
        return contentRepository.findAll();
    }

    public Optional<Content> findById(Long id) {
        return contentRepository.findById(id);
    }

    public Content createContent(ContentRequest contentRequest) {
        Content content = Content.builder()
                .idExternal(contentRequest.idExternal())
                .createdAt(contentRequest.createdAt())
                .updatedAt(contentRequest.updatedAt())
                .title(contentRequest.title())
                .plot(contentRequest.plot())
                .posterPath(contentRequest.posterPath()).build();
        return contentRepository.save(content);
    }
}