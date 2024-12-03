package com.mubisearch.content.services;

import com.mubisearch.content.controllers.dto.VoteRequest;
import com.mubisearch.content.entities.Content;
import com.mubisearch.content.entities.Vote;
import com.mubisearch.content.repositories.ContentRepository;
import com.mubisearch.content.repositories.VoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
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
        // Nos aseguramos de que el registro se haya borrado antes de insertar el nuevo voto
        voteRepository.flush();
        Content content = contentRepository.findById(voteRequest.idContent()).orElseThrow(() -> new RuntimeException("Content not found"));
        Vote vote = Vote.builder()
                .content(content)
                .idUser(voteRequest.idUser())
                .createdAt(LocalDateTime.now())
                .score(voteRequest.score()).build();

        return voteRepository.save(vote);
    }

    @Transactional
    public Content updateAverageScore(Vote vote) {
        Long idContent = vote.getContent().getId();
        Content content = contentRepository.findById(idContent).orElseThrow(() -> new RuntimeException("Content not found"));

        List<Vote> votes = vote.getContent().getVotes();
        log.info("Content: {}", content);
        log.info("Votes: {}", votes);

        BigDecimal averageScore = votes.isEmpty()
                ? BigDecimal.ZERO
                : BigDecimal.valueOf(votes.stream().mapToInt(Vote::getScore).average().orElse(0.0))
                .setScale(1, RoundingMode.HALF_UP);
        content.setAverageScore(averageScore);
        return contentRepository.save(content);
    }

}
