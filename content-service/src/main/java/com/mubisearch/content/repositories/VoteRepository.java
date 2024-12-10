package com.mubisearch.content.repositories;

import com.mubisearch.content.entities.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByIdUserAndContentId(Long userId, Long contentId);
    List<Vote> findByContentId(Long contentId);
    void deleteByIdUserAndContentId(Long userId, Long contentId);

}
