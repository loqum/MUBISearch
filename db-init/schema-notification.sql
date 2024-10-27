USE notificationservice;

CREATE TABLE IF NOT EXISTS notification
(
    id                   BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_user              BIGINT   NOT NULL,
    id_content           BIGINT   NOT NULL,
    id_notification_type BIGINT   NOT NULL,
    created_at           DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS notification_type
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

