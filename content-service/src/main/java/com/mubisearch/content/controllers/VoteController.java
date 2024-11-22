package com.mubisearch.content.controllers;

import com.mubisearch.content.controllers.dto.ContentRequest;
import com.mubisearch.content.controllers.dto.VoteRequest;
import com.mubisearch.content.entities.Vote;
import com.mubisearch.content.services.VoteService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("api/v1/votes")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<Vote> getAllContents() {
        log.info("Init getAllContents");
        return voteService.findAll();
    }

    @PostMapping("/create")
    public ResponseEntity<String> createVote(@RequestBody VoteRequest voteRequest) {
        log.info("Init createVote");
        String idVote = voteService.createVote(voteRequest).getId().toString();
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{idVote}")
                .buildAndExpand(idVote)
                .toUri();
        return ResponseEntity.created(uri).body(idVote);
    }
}
