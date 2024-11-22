USE userservice;

CREATE TABLE IF NOT EXISTS user
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(255) NOT NULL,
    fullname   VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    created_at DATETIME     NOT NULL,
    role       VARCHAR(50)  NOT NULL
);

CREATE TABLE IF NOT EXISTS favorite
(
    id                 BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_user            BIGINT   NOT NULL,
    id_content         BIGINT   NOT NULL,
    created_at         DATETIME NOT NULL,
    notification_alert BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_user) REFERENCES user (id) ON DELETE CASCADE,
    UNIQUE (id_user, id_content)
);
