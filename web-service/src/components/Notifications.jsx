import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {MoviesContext} from "../context/movies.context.jsx";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import {UserContext} from "../context/user.context.jsx";

export const Notifications = ({idUser}) => {

    const [notifications, setNotifications] = useState([]);
    const [notificationsWithTitles, setNotificationsWithTitles] = useState([]);
    const [error, setError] = useState(null);
    const pollingInterval = 30000;
    const {fetchMovieById} = useContext(MoviesContext);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                if (!idUser) {
                    return;
                }
                const response = await axios({
                    method: 'GET',
                    url: `http://localhost:8080/api/v1/notifications/idUser/${idUser}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const notifications = response.data;

                const notificationsWithMovieTitles = await Promise.all(
                    notifications.map(async (notification) => {
                        const movie = await fetchMovieById(notification.idContent);
                        return {
                            ...notification,
                            title: movie.title,
                        };
                    })
                );
                setNotificationsWithTitles(notificationsWithMovieTitles);
                setNotifications(notifications);
            } catch (e) {
                setError("Failed to fetch notifications");
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, pollingInterval);
        return () => {
            clearInterval(interval);
        };
    }, [idUser, pollingInterval, fetchMovieById]);

    const handleDeleteClick = async (notification) => {
        try {
            await axios({
                method: 'DELETE',
                url: `http://localhost:8080/api/v1/notifications/delete/${notification.id}`,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setNotificationsWithTitles((prevNotifications) =>
                prevNotifications.filter((n) => n.id !== notification.id)
            );
        } catch (e) {
            setError("Failed to delete notification");
        }
    }

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).format(new Date(date));
    };


    return (
        <>
            <h4 className={"mb-4 mt-4"}>Notificaciones</h4>
            {notificationsWithTitles.length === 0 ? (
                <p>No tienes notificaciones en este momento. ¡Todo está en orden!</p>
            ) : (
                <ListGroup className="mb-5">
                    {notificationsWithTitles.map((n) => (
                        <ListGroup.Item key={n}
                                        className={`mb-4 ${n !== 0 ? "border-top" : ""} position-relative`}>
                            <div>
                                <i
                                    className="bi bi-trash-fill text-danger position-absolute"
                                    style={{
                                        top: "10px",
                                        right: "10px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleDeleteClick(n)}

                                ></i>
                                {n.description} para la película{" "}
                                <Link to={`/details/${n.idContent}`} className="text-decoration-none">
                                    {n.title}
                                </Link>
                            </div>
                            <small className="text-muted">
                                Recibido el {formatDate(n.createdAt)}
                            </small>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    )
}