package com.mubisearch.content.configuration;

import com.mubisearch.content.services.VoteListener;
import com.mubisearch.content.services.VoteService;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ListenerConfig {

    public ListenerConfig(VoteService voteService) {
        VoteListener.setVoteService(voteService);
    }

}
