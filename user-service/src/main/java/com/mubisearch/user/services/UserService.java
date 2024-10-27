package com.mubisearch.user.services;

import com.mubisearch.user.controllers.dto.UserRequest;
import com.mubisearch.user.entities.User;
import com.mubisearch.user.entities.UserRole;
import com.mubisearch.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public User createUser(UserRequest user) {
        String encodedPassword = passwordEncoder.encode(user.password());
        User newUser = User.builder().email(user.email()).password(encodedPassword).name(user.name()).createdAt(LocalDateTime.now()).role(UserRole.REGISTERED_USER).build();
        return userRepository.save(newUser);
    }

}
