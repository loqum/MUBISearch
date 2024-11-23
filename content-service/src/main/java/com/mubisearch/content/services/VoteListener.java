package com.mubisearch.content.services;

import com.mubisearch.content.entities.Vote;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostUpdate;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class VoteListener {

    @Setter
    private static VoteService voteService;

    @PostPersist
    @PostUpdate
    public void updateAverageScore(Vote vote) {
        voteService.updateAverageScore(vote);
    }
}
