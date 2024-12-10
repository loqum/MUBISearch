package com.mubisearch.content.adapters.incoming.event;

import com.mubisearch.content.domain.model.Content;
import com.mubisearch.content.domain.model.Vote;
import com.mubisearch.content.domain.service.VoteService;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostUpdate;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class VoteListener {

    @Setter
    private static VoteService voteService;

    @PostPersist
    @PostUpdate
    public void updateAverageScore(Vote vote) {
        Content content = voteService.updateAverageScore(vote);
        log.info("Average score updated for content with id: {}", content.getId());
    }
}
