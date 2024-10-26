package com.mubisearch.user.controllers.dto;

import com.mubisearch.user.entities.User;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class UserResponse {

    private final Long id;
    private String name;
    private String email;
    private String password;
    private Date dateRegister;

    public static UserResponse from(User user) {
        return UserResponse.builder().id(user.getId()).name(user.getName()).email(user.getEmail()).password(user.getPassword()).dateRegister(user.getDateRegister()).build();
    }

}