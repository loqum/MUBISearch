package com.mubisearch.user.services;

import com.mubisearch.user.entities.User;
import com.mubisearch.user.repositories.UserRepository;
import com.mubisearch.user.rest.dto.UserRegisterRequest;
import com.mubisearch.user.rest.dto.UserUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    public Optional<User> findBySub(String sub) {
        return userRepository.findBySub(sub);
    }

    public Optional<User> findByName(String name) {
        return userRepository.findUserByName(name);
    }

    public User createUser(UserRegisterRequest user) {
        User newUser = User.builder().sub(user.sub()).name(user.name()).email(user.email()).createdAt(LocalDateTime.now()).build();
        return userRepository.save(newUser);
    }

    public User updateUser(Long idUser, UserUpdateRequest user) {
        User userToUpdate = userRepository.findById(idUser).orElseThrow(() -> new IllegalArgumentException("User with id: " + idUser + " not found"));
        userToUpdate.setUpdatedAt(LocalDateTime.now());
        if (user.fullname() != null) {
            userToUpdate.setFullname(user.fullname());
        }
        if (user.birthdate() != null) {
            userToUpdate.setBirthdate(user.birthdate());
        }
        return userRepository.save(userToUpdate);
    }

    public boolean userExists(String sub) {
        return userRepository.findBySub(sub).isPresent();
    }

}
