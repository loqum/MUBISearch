package com.mubisearch.content.services;

import com.mubisearch.content.controllers.dto.VoteRequest;
import com.mubisearch.content.entities.Content;
import com.mubisearch.content.entities.Vote;
import com.mubisearch.content.repositories.ContentRepository;
import com.mubisearch.content.repositories.VoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private ContentRepository contentRepository;

    public List<Vote> findAll() {
        return voteRepository.findAll();
    }

    public Optional<Vote> findByUserAndContent(Long userId, Long contentId) {
        return voteRepository.findByIdUserAndContentId(userId, contentId);
    }

    @Transactional
    public Vote upsertVote(VoteRequest voteRequest) {
        voteRepository.deleteByIdUserAndContentId(voteRequest.idUser(), voteRequest.idContent());
        // Aseguramos que el registro se ha borrado antes de insertar el nuevo voto
        voteRepository.flush();
        Content content = contentRepository.findById(voteRequest.idContent()).orElseThrow(() -> new RuntimeException("Content not found"));
        Vote vote = Vote.builder()
                .content(content)
                .idUser(voteRequest.idUser())
                .createdAt(LocalDateTime.now())
                .score(voteRequest.score()).build();

        return voteRepository.save(vote);
    }

}