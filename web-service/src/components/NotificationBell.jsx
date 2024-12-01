import NotificationsIcon from '@mui/icons-material/Notifications';
import {Fab} from "@mui/material";

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
                <Fab aria-label="subscribe">
                    <NotificationsIcon color="primary"/>
                </Fab>
            ) : (
                <Fab aria-label="unsubscribe">
                    <NotificationsIcon />
                </Fab>
            )}
        </span>

    );
}

export default NotificationBell;