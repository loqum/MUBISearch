package com.mubisearch.content.controllers.dto;

import com.mubisearch.content.entities.Content;
import com.mubisearch.content.entities.Vote;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class VoteResponse {

    private Long id;
    private Long idUser;
    private Content content;
    private int score;
    private LocalDateTime createdAt;

    public static VoteResponse from(Vote vote) {
        return VoteResponse.builder()
                .id(vote.getId())
                .idUser(vote.getIdUser())
                .content(vote.getContent())
                .score(vote.getScore())
                .createdAt(vote.getCreatedAt())
                .build();
    }
}
