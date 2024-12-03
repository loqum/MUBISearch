package com.mubisearch.content.services;

import com.mubisearch.content.controllers.dto.ContentResponse;
import com.mubisearch.content.entities.Content;
import com.mubisearch.content.repositories.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    public List<Content> findAll() {
        return contentRepository.findAll();
    }

    public Optional<ContentResponse> findById(Long id) {
        return contentRepository.findById(id)
                .map(ContentResponse::from);
    }

}
