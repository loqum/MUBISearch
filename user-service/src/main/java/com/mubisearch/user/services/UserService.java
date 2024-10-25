package com.mubisearch.user.services;

import com.mubisearch.user.entities.User;
import com.mubisearch.user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(String email, String password, String name) {
        User user = User.builder().email(email).password(password).name(name).dateRegister(new Date()).build();
        return userRepository.save(user);
    }
}
