package com.mubisearch.content.services;

import com.mubisearch.content.controllers.dto.ContentRequest;
import com.mubisearch.content.controllers.dto.ContentResponse;
import com.mubisearch.content.controllers.dto.MovieResponse;
import com.mubisearch.content.entities.Content;
import com.mubisearch.content.entities.Genre;
import com.mubisearch.content.entities.Movie;
import com.mubisearch.content.repositories.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

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

//    public Content createContent(ContentRequest contentRequest) {
//        Content content = Content.builder()
//                .id(contentRequest.id())
//                .title(contentRequest.title())
//                .plot(contentRequest.plot())
//                .posterPath(contentRequest.posterPath()).build();
//        return contentRepository.save(content);
//    }
}
