USE contentservice;

CREATE TABLE IF NOT EXISTS external_entity
(
    id_external BIGINT PRIMARY KEY,
    created_at  DATETIME NOT NULL,
    updated_at  DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS content
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(255) NOT NULL,
    plot        VARCHAR(1000),
    poster_path VARCHAR(255),
    id_external BIGINT,
    FOREIGN KEY (id_external) REFERENCES external_entity (id_external)
);

CREATE TABLE IF NOT EXISTS movie
(
    id             BIGINT PRIMARY KEY,
    original_title VARCHAR(255),
    release_date   DATE,
    FOREIGN KEY (id) REFERENCES content (id)
);

CREATE TABLE IF NOT EXISTS series
(
    id             BIGINT PRIMARY KEY,
    origin_country VARCHAR(255),
    original_name  VARCHAR(255),
    first_air      DATE,
    FOREIGN KEY (id) REFERENCES content (id)
);

CREATE TABLE IF NOT EXISTS genre
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL,
    id_external BIGINT,
    FOREIGN KEY (id_external) REFERENCES external_entity (id_external)
);

CREATE TABLE IF NOT EXISTS content_genre
(
    id_content BIGINT,
    id_genre   BIGINT,
    PRIMARY KEY (id_content, id_genre),
    FOREIGN KEY (id_content) REFERENCES content (id) ON DELETE CASCADE,
    FOREIGN KEY (id_genre) REFERENCES genre (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS crew_member
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    known_for   VARCHAR(100),
    role        VARCHAR(100),
    image       VARCHAR(255),
    biography   VARCHAR(1000),
    id_external BIGINT,
    FOREIGN KEY (id_external) REFERENCES external_entity (id_external)
);

CREATE TABLE IF NOT EXISTS crew_assignment
(
    id_crew_member BIGINT,
    id_content     BIGINT,
    role           VARCHAR(100),
    PRIMARY KEY (id_crew_member, id_content),
    FOREIGN KEY (id_crew_member) REFERENCES crew_member (id) ON DELETE CASCADE,
    FOREIGN KEY (id_content) REFERENCES content (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vote
(
    id_user    BIGINT   NOT NULL,
    id_content BIGINT   NOT NULL,
    score      INTEGER  NOT NULL,
    date_score DATETIME NOT NULL,
    PRIMARY KEY (id_user, id_content),
    FOREIGN KEY (id_content) REFERENCES content (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_user    BIGINT        NOT NULL,
    id_content BIGINT        NOT NULL,
    text       VARCHAR(1000) NOT NULL,
    date_text  DATETIME      NOT NULL,
    FOREIGN KEY (id_content) REFERENCES content (id) ON DELETE CASCADE
);
