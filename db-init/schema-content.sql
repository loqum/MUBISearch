USE contentservice;

CREATE TABLE IF NOT EXISTS content
(
    id          BIGINT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    plot        VARCHAR(1000),
    poster_path VARCHAR(255),
    average_score DECIMAL(3, 1) DEFAULT NOT NULL 0.0,
    created_at  DATETIME NOT NULL,
    updated_at  DATETIME NOT NULL
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

CREATE TABLE IF NOT EXISTS content_genre (

    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_content BIGINT,
    genre      VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_content) REFERENCES content (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vote
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_user    BIGINT   NOT NULL,
    id_content BIGINT   NOT NULL,
    score      INTEGER  NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at  DATETIME NOT NULL,
    FOREIGN KEY (id_content) REFERENCES content (id) ON DELETE CASCADE,
    UNIQUE (id_user, id_content)
);

CREATE TABLE IF NOT EXISTS review
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_user    BIGINT        NOT NULL,
    id_content BIGINT        NOT NULL,
    text       VARCHAR(1000) NOT NULL,
    created_at  DATETIME     NOT NULL,
    updated_at  DATETIME     NOT NULL,
    FOREIGN KEY (id_content) REFERENCES content (id) ON DELETE CASCADE,
    UNIQUE (id_user, id_content)
);
