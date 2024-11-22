package com.mubisearch.user.services;

import com.mubisearch.user.entities.User;
import com.mubisearch.user.entities.UserRole;
import com.mubisearch.user.repositories.UserRepository;
import com.mubisearch.user.rest.dto.UserLoginRequest;
import com.mubisearch.user.rest.dto.UserRegisterRequest;
import com.mubisearch.user.rest.dto.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    public Optional<User> findByName(String name) {
        return userRepository.findUserByName(name);
    }

    public User createUser(UserRegisterRequest user) {
        String encodedPassword = passwordEncoder.encode(user.password());
        User newUser = User.builder().fullName(user.fullName()).password(encodedPassword).name(user.name()).createdAt(LocalDateTime.now()).role(UserRole.REGISTERED_USER).build();
        return userRepository.save(newUser);
    }

    public UserResponse validateUser(UserLoginRequest userRequest) {
        User user = userRepository.findUserByName(userRequest.name()).orElseThrow(() -> new UsernameNotFoundException("User not found."));
        validatePassword(userRequest, user);
        return UserResponse.from(user);
    }

    private void validatePassword(UserLoginRequest userRequest, User user) {
        if (!passwordEncoder.matches(userRequest.password(), user.getPassword())) {
            throw new BadCredentialsException("Incorrect password.");
        }
    }


}
