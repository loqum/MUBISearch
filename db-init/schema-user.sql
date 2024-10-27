USE userservice;

CREATE TABLE IF NOT EXISTS user
(
    id            BIGINT PRIMARY KEY AUTO_INCREMENT,
    name          VARCHAR(255) NOT NULL,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL,
    date_register DATETIME     NOT NULL,
    role          VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS favorite
(
    id                 BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_user            BIGINT   NOT NULL,
    id_content         BIGINT   NOT NULL,
    date_favorite      DATETIME NOT NULL,
    notification_alert BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_user) REFERENCES user (id)
);
