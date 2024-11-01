USE contentservice;

CREATE TABLE IF NOT EXISTS content
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(255) NOT NULL,
    plot        VARCHAR(1000),
    poster_path VARCHAR(255),
    id_external BIGINT,
    created_at  DATETIME,
    updated_at  DATETIME
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
    created_at  DATETIME,
    updated_at  DATETIME
);

CREATE TABLE IF NOT EXISTS content_genre (

    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_content BIGINT,
    genre      VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_content) REFERENCES content (id) ON DELETE CASCADE,
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
    created_at  DATETIME,
    updated_at  DATETIME
);

CREATE TABLE IF NOT EXISTS crew_assignment
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_crew_member BIGINT,
    id_content     BIGINT,
    role           VARCHAR(100),
    FOREIGN KEY (id_crew_member) REFERENCES crew_member (id) ON DELETE CASCADE,
    FOREIGN KEY (id_content) REFERENCES content (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vote
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_user    BIGINT   NOT NULL,
    id_content BIGINT   NOT NULL,
    score      INTEGER  NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (id_content) REFERENCES content (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_user    BIGINT        NOT NULL,
    id_content BIGINT        NOT NULL,
    text       VARCHAR(1000) NOT NULL,
    created_at  DATETIME      NOT NULL,
    FOREIGN KEY (id_content) REFERENCES content (id) ON DELETE CASCADE
);
