package com.mubisearch.user.repositories;

import com.mubisearch.user.entities.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = {"favorites"})
    Optional<User> findUserByName(String username);
}
