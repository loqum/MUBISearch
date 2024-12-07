package com.mubisearch.user.rest.dto;

import com.mubisearch.user.entities.Favorite;
import com.mubisearch.user.entities.Roles;
import com.mubisearch.user.entities.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class UserResponse {

    private final Long id;
    private String name;
    private String email;
    private String sub;
    private String fullname;
    private Roles role;
    private LocalDate birthdate;
    private List<Favorite> favorites;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .fullname(user.getFullname())
                .email(user.getEmail())
                .sub(user.getSub())
                .role(user.getRole())
                .birthdate(user.getBirthdate())
                .favorites(user.getFavorites())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

}
