import {Bell, BellFill} from "react-bootstrap-icons";

function NotificationBell({onToggle, isNotified}) {
    const handleClick = () => {
        const newNotificationState = !isNotified;
        if (onToggle) {
            onToggle(newNotificationState);
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
                <BellFill size={24} color="#99d5ff" style={{ stroke: "black", strokeWidth: "0.25" }} />
            ) : (
                <Bell size={24} color="gray"/>
            )}
        </span>

    );
}

export default NotificationBell;