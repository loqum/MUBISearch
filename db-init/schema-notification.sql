USE notificationservice;

CREATE TABLE IF NOT EXISTS Notification (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_user INTEGER NOT NULL,
    id_content INTEGER NOT NULL,
    id_notification_type INTEGER NOT NULL,
    date_notification DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS NotificationType (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

