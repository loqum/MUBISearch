package com.mubisearch.content.services;

import com.mubisearch.content.controllers.dto.VoteRequest;
import com.mubisearch.content.entities.Vote;
import com.mubisearch.content.repositories.VoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    public List<Vote> findAll() {
        return voteRepository.findAll();
    }

    public Vote createVote(VoteRequest voteRequest) {
        Vote vote = Vote.builder()
                .content(voteRequest.content())
                .idUser(voteRequest.idUser())
                .score(voteRequest.score()).build();
        return voteRepository.save(vote);
    }
}
