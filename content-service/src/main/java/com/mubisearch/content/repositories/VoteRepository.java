package com.mubisearch.content.repositories;

import com.mubisearch.content.entities.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {
}
