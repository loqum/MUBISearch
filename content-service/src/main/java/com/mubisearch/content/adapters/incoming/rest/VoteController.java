package com.mubisearch.content.adapters.incoming.rest;

import com.mubisearch.content.application.dto.VoteRequest;
import com.mubisearch.content.application.dto.VoteResponse;
import com.mubisearch.content.domain.model.NotificationType;
import com.mubisearch.content.domain.model.Vote;
import com.mubisearch.content.adapters.outgoing.messaging.ContentUpdatePublisher;
import com.mubisearch.content.domain.service.VoteService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("api/v1/votes")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @Autowired
    private ContentUpdatePublisher contentUpdatePublisher;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<Vote> getAllContents() {
        log.info("Init getAllContents");
        return voteService.findAll();
    }

    @GetMapping("/user/{idUser}/content/{idContent}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<VoteResponse> getVoteByUserAndContent(@PathVariable Long idUser, @PathVariable Long idContent) {
        log.info("Init getVoteByUserAndContent");
        Optional<Vote> vote = voteService.findByUserAndContent(idUser, idContent);
        return vote.map(v -> ResponseEntity.ok().body(VoteResponse.from(v))).orElse(ResponseEntity.noContent().build());
    }

    @PostMapping("/create")
    public ResponseEntity<String> createVote(@RequestBody VoteRequest voteRequest) {
        log.info("Init createVote");
        String idVote = voteService.upsertVote(voteRequest).getId().toString();
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{idVote}")
                .buildAndExpand(idVote)
                .toUri();

        contentUpdatePublisher.publishContentUpdate(voteRequest.idUser(), voteRequest.idContent(), NotificationType.NEW_VOTE);
        return ResponseEntity.created(uri).body(idVote);
    }
}
