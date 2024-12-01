package com.mubisearch.user.rest.dto;

import com.mubisearch.user.entities.Favorite;
import com.mubisearch.user.entities.User;
import com.mubisearch.user.entities.UserRole;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class UserResponse {

    private final Long id;
    private String name;
    private String email;
    private String sub;
    private UserRole userRole;
    private List<Favorite> favorites;
    private LocalDateTime createdAt;

    public static UserResponse from(User user) {
        return UserResponse.builder().id(user.getId()).name(user.getName()).email(user.getEmail()).sub(user.getSub()).userRole(user.getRole()).favorites(user.getFavorites()).createdAt(user.getCreatedAt()).build();
    }

}
