package com.mubisearch.content.entities;

import lombok.*;

import java.util.HashMap;
import java.util.Map;

@Getter
@AllArgsConstructor
public enum Genre {

    ACTION_ADVENTURE(10759, "Action & Adventure"),
    ANIMATION(16, "Animación"),
    COMEDY(35, "Comedia"),
    CRIME(80, "Crimen"),
    DOCUMENTARY(99, "Documental"),
    DRAMA(18, "Drama"),
    FAMILY(10751, "Familia"),
    KIDS(10762, "Kids"),
    MYSTERY(9648, "Misterio"),
    NEWS(10763, "News"),
    REALITY(10764, "Reality"),
    SCIFI_FANTASY(10765, "Sci-Fi & Fantasy"),
    SOAP(10766, "Soap"),
    TALK(10767, "Talk"),
    WAR_POLITICS(10768, "War & Politics"),
    WESTERN(37, "Western"),
    ACTION(28, "Acción"),
    ADVENTURE(12, "Aventura"),
    FANTASY(14, "Fantasía"),
    HISTORY(36, "Historia"),
    HORROR(27, "Terror"),
    MUSIC(10402, "Música"),
    ROMANCE(10749, "Romance"),
    SCIENCE_FICTION(878, "Ciencia ficción"),
    TV_MOVIE(10770, "Película de TV"),
    THRILLER(53, "Suspense"),
    WAR(10752, "Bélica");

    private final Integer id;
    private final String name;

    private static final Map<String, Genre> BY_NAME = new HashMap<>();
    private static final Map<Integer, Genre> BY_ID = new HashMap<>();

    static {
        for (Genre e: values()) {
            BY_NAME.put(e.name, e);
            BY_ID.put(e.id, e);
        }
    }

    public static Genre valueOfName(String name) {
        return BY_NAME.get(name);
    }

    public static Genre valueOfId(Integer id) {
        return BY_ID.get(id);
    }

}
