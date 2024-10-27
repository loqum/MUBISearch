package com.mubisearch.user.repositories;

import com.mubisearch.user.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByName(String username);
    Optional<User> findUserByEmail(String email);
}
