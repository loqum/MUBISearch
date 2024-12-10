package com.mubisearch.content.configuration;

import com.mubisearch.content.adapters.incoming.event.VoteListener;
import com.mubisearch.content.domain.service.VoteService;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ListenerConfig {

    public ListenerConfig(VoteService voteService) {
        VoteListener.setVoteService(voteService);
    }

}
