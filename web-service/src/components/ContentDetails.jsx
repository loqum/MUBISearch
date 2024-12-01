import {Card, OverlayTrigger, Spinner, Tooltip} from "react-bootstrap";
import DetailsWrapper from "../hoc/DetailsWrapper.jsx";
import {useLocation, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import FavoriteHeart from "./FavoriteHeart.jsx";
import {MoviesContext} from "../context/movies.context.jsx";
import {UserContext} from "../context/user.context.jsx";
import VotesButton from "./VotesButton.jsx";
import NotificationBell from "./NotificationBell.jsx";
import {Review} from "./Review.jsx";
import Alerts from "./Alerts.jsx";
import {useAuth0} from "@auth0/auth0-react";

function ContentDetails() {

    const location = useLocation();
    const {
        urlImage,
        createFavorite,
        deleteFavorite,
        createMovie,
        createSeries,
        fetchMovieById,
        fetchSeriesById,
        fetchContentById,
        getFavoriteByIdUserAndIdContent,
        formatDateISO8601,
        convertDateToDayMonthYear,
        updateFavoriteAlert
    } = useContext(MoviesContext);
    const {user, fetchUserBySub} = useContext(UserContext);
    const { isAuthenticated, isLoading, auth0User } = useAuth0();
    const {idContent} = useParams(); //Recuperar el id de la película de la URL
    const contentFromNavigate = location?.state?.content; // Recuperar película desde la pantalla anterior mediante navegación
    const [isMovie, setIsMovie] = useState(location?.state?.isMovie);
    const [isSeries, setIsSeries] = useState(location?.state?.isSeries);
    const [content, setContent] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorite, setFavorite] = useState(null);
    const [isNotified, setIsNotified] = useState(false);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        if (!content) {
            getContent();
        }
    }, [idContent]);

    useEffect(() => {
        if (user && content) {
            checkFavorite();
        }

    }, [user, content]);

    const addAlert = (message, variant) => {
        setAlerts((prevAlerts) => [...prevAlerts, { message, variant }]);
        setTimeout(() => setAlerts([]), 3000);
    };

    const dismissAlert = (index) => {
        setAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index));
        setTimeout(() => setAlerts([]), 3000);
    };

    const checkFavorite = async () => {
        if (user && content) {
            try {
                const favoriteData = await getFavoriteByIdUserAndIdContent(user, content);
                if (favoriteData) {
                    setIsFavorite(true);
                    setIsNotified(favoriteData.notificationAlert);
                    setFavorite(favoriteData);
                } else {
                    setIsFavorite(false);
                    setIsNotified(false);
                    setFavorite(null);
                }
            } catch (e) {
                setIsFavorite(false);
                setFavorite(null);
            }

        }
    }

    const getContent = async () => {
        try {
            let contentFromBBDD = await fetchContentById(idContent);
            if (contentFromBBDD) {
                setContent(contentFromBBDD);

                if (isMovie === undefined) {
                    setIsMovie(contentFromBBDD.type === "Movie");
                }

                if (isSeries === undefined) {
                    setIsSeries(contentFromBBDD.type === "Series");
                }

            } else {
                if (contentFromNavigate && isMovie) {
                    const id = await createMovie({
                        originalTitle: contentFromNavigate.original_title,
                        releaseDate: formatDateISO8601(contentFromNavigate.release_date),
                        id: contentFromNavigate.id,
                        title: contentFromNavigate.title,
                        plot: contentFromNavigate.overview,
                        posterPath: contentFromNavigate.poster_path,
                        genres: contentFromNavigate.genres,
                        averageScore: 0
                    });

                    const savedContent = await fetchMovieById(id);
                    setContent(savedContent);
                }

                if (contentFromNavigate && isSeries) {
                    const id = await createSeries({
                        firstAir: formatDateISO8601(contentFromNavigate.first_air_date),
                        id: contentFromNavigate.id,
                        plot: contentFromNavigate.overview,
                        posterPath: contentFromNavigate.poster_path,
                        genres: contentFromNavigate.genres,
                        averageScore: 0,
                        originCountry: contentFromNavigate.origin_country[0] || "Desconocido",
                        originalName: contentFromNavigate.original_name,
                    });

                    const savedContent = await fetchSeriesById(id);
                    setContent(savedContent);
                }
            }
        } catch (e) {
            console.error("Error fetching or creating content:", e);
            setContent(contentFromNavigate);
        }
    };

    const handleFavoriteToggle = async (favoriteState) => {

        setIsFavorite(favoriteState);

        try {
            if (favoriteState) {
                addAlert("Contenido añadido a favoritos", "success");
                await createFavorite({
                    idUser: user.id,
                    idContent: content.id,
                });
            } else {
                addAlert("Contenido eliminado de favoritos", "warning");
                await deleteFavorite(favorite.id);

            }
        } catch (e) {
            console.error(favoriteState ? "Error creating favorite:" : "Error deleting favorite:", e);

            setIsFavorite(!favoriteState);
        }

        await fetchUserBySub();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleNotificationToggle = async (notificationState) => {
        setIsNotified(notificationState);
        try {
            await updateFavoriteAlert(favorite.id, notificationState);
        } catch (e) {
            console.error("Error creating notification: ", e);
        }

        if (notificationState) {
            addAlert("¡Te has suscrito a las notificaciones para este contenido!", "success");
        } else {
            addAlert("¡Has desactivado las notificaciones para este contenido!", "warning");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    if (!content) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );

    }

    return (
        <>
            <Alerts alerts={alerts} dismissAlert={dismissAlert} />

            <Card>
                <Card.Img variant="top" src={`${urlImage}${content.posterPath}`} className="img-fluid"
                          style={{maxHeight: '600px', objectFit: 'cover'}}/>
                <Card.Header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    {isMovie ? <span>Película</span> : <span>Serie</span>}
                    <div style={{display: "inline-flex", gap: "5px", alignItems: "center"}}>
                        {isAuthenticated && (
                            <OverlayTrigger placement="top" overlay={<Tooltip
                                id="tooltip-favorite"> {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"} </Tooltip>}>
                                <div>
                                    <FavoriteHeart onToggle={handleFavoriteToggle} isFavorite={isFavorite}/>
                                </div>
                            </OverlayTrigger>
                        )}
                        {isAuthenticated && isFavorite && (
                            <OverlayTrigger placement="top" overlay={<Tooltip
                                id="tooltip-notification"> {isNotified ? "Desactivar notificaciones" : "Activar notificaciones"} </Tooltip>}>
                                <div>
                                    <NotificationBell onToggle={handleNotificationToggle} isNotified={isNotified}/>
                                </div>
                            </OverlayTrigger>
                        )}
                    </div>
                </Card.Header>

                <Card.Body>
                    <Card.Title>{content.title}</Card.Title>
                    <Card.Text>{content.plot}</Card.Text>
                    <Card.Text>
                        <strong>Géneros: </strong>{Object.values(content.genres).join(', ')}
                    </Card.Text>
                    {isSeries && (
                        <Card.Text>
                            <strong>País de origen: </strong>{content.originCountry}
                        </Card.Text>
                    )}
                    <Card.Text>
                        {isMovie ? (
                            <>
                                <strong>Fecha de estreno: </strong>
                                {content.releaseDate && convertDateToDayMonthYear(content.releaseDate)}
                            </>
                        ) : (
                            <>
                                <strong>Fecha de primera emisión: </strong>
                                {content.firstAirDate && convertDateToDayMonthYear(content.firstAirDate)}
                            </>
                        )}
                    </Card.Text>
                    <Card.Text><strong>Valoración: </strong> {content.averageScore === 0 ? "Todavía no se ha valorado" : content.averageScore}
                    </Card.Text>

                    {isAuthenticated && (
                        <>
                            <VotesButton content={content} setContent={setContent}/>
                        </>
                    )}

                    <Review content={content}/>
                </Card.Body>


            </Card>





        </>

    );
}

export default DetailsWrapper(ContentDetails);
