USE notificationservice;

CREATE TABLE IF NOT EXISTS notification
(
    id                   BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_user              BIGINT   NOT NULL,
    id_content           BIGINT   NOT NULL,
    id_notification_type BIGINT   NOT NULL,
    created_at           DATETIME NOT NULL
	notification_type	 VARCHAR(50) NOT NULL,
	description			 VARCHAR(255) NOT NULL
);

