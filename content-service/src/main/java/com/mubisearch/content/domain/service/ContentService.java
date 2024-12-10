package com.mubisearch.content.domain.service;

import com.mubisearch.content.application.dto.ContentResponse;
import com.mubisearch.content.domain.model.Content;
import com.mubisearch.content.domain.repository.ContentRepository;
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
