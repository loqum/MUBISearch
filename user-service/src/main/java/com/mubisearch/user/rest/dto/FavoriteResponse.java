package com.mubisearch.user.rest.dto;

import com.mubisearch.user.entities.Favorite;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FavoriteResponse {

    private Long id;
    private Long idUser;
    private Long idContent;
    private LocalDateTime createdAt;
    private boolean notificationAlert;

    public static FavoriteResponse from(Favorite favorite) {
        return FavoriteResponse.builder().id(favorite.getId()).idUser(favorite.getIdUser()).idContent(favorite.getIdContent()).createdAt(LocalDateTime.now()).notificationAlert(true).build();
    }


}
