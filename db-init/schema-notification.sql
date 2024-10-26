USE notificationservice;

CREATE TABLE IF NOT EXISTS Notification (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_user BIGINT NOT NULL,
    id_content BIGINT NOT NULL,
    id_notification_type BIGINT NOT NULL,
    date_notification DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS NotificationType (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

