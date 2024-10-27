package com.mubisearch.user.rest.dto;

import com.mubisearch.user.entities.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {

    private final Long id;
    private String name;
    private String fullname;
    private String password;
    private LocalDateTime createdAt;

    public static UserResponse from(User user) {
        return UserResponse.builder().id(user.getId()).name(user.getName()).fullname(user.getFullName()).password(user.getPassword()).createdAt(user.getCreatedAt()).build();
    }

}
