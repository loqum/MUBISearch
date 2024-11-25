import {Bell, BellFill} from "react-bootstrap-icons";

function NotificationBell({handleNotificationToggle, isNotified}) {
    const handleClick = () => {
        const newNotificationState = !isNotified;
        if (handleNotificationToggle) {
            handleNotificationToggle(newNotificationState);
        }
    };

    return (
        <span
            onClick={handleClick}
            role="button"
            style={{cursor: "pointer"}}
            aria-label={isNotified ? "Eliminar de notificaciones" : "Añadir a notificaciones"}
        >
            {isNotified ? (
                <BellFill size={24} color="blue"/>
            ) : (
                <Bell size={24} color="gray"/>
            )}
        </span>

    );
}

export default NotificationBell;