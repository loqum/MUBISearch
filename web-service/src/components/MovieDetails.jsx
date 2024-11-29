import {Alert, Button, Card, Form, InputGroup, OverlayTrigger, Spinner, Tooltip} from "react-bootstrap";
import DetailsWrapper from "../hoc/DetailsWrapper.jsx";
import {useLocation, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import FavoriteHeart from "./FavoriteHeart.jsx";
import {MoviesContext} from "../context/movies.context.jsx";
import {UserContext} from "../context/user.context.jsx";
import VotesButton from "./VotesButton.jsx";
import NotificationBell from "./NotificationBell.jsx";

function MovieDetails(props) {

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
        convertDateToDayMonthYearTime,
        getVoteByUserAndContent,
        createVote,
        createReview,
        getReviewsByContent,
        updateFavoriteAlert
    } = useContext(MoviesContext);
    const {user, fetchUpdatedUser, fetchUser} = useContext(UserContext);
    const {idContent} = useParams(); //Recuperar el id de la película de la URL
    const contentFromNavigate = location?.state?.content; // Recuperar película desde la pantalla anterior mediante navegación
    const isMovie = location?.state?.isMovie || false;
    const isSeries = location?.state?.isSeries || false;
    const [content, setContent] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorite, setFavorite] = useState(null);
    const [selectedVote, setSelectedVote] = useState(0);
    const [vote, setVote] = useState(null);
    const [showVoteMessage, setShowVoteMessage] = useState(false);
    const [newReview, setNewReview] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [isNotified, setIsNotified] = useState(false);

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

    useEffect(() => {
        if (user && content) {
            checkVote();
        }

    }, [user, content]);

    useEffect(() => {
        if (content) {
            checkReviews();
        }
    }, [content]);

    const checkFavorite = async () => {
        console.log("User: ", user);
        if (user && content) {
            try {
                const favoriteData = await getFavoriteByIdUserAndIdContent(user, content);
                if (favoriteData) {
                    setIsFavorite(true);
                    setIsNotified(favoriteData.notificationAlert);
                    setFavorite(favoriteData);
                    console.log("Favorite data:", favoriteData);
                } else {
                    setIsFavorite(false);
                    setIsNotified(false);
                    setFavorite(null);
                }
            } catch (e) {
                console.error("Error checking favorite:", e);
                setIsFavorite(false);
                setFavorite(null);
            }

        }
    }

    const checkVote = async () => {
        console.log("User: ", user);
        if (user && content) {
            try {
                const voteData = await getVoteByUserAndContent(user, content);
                if (voteData) {
                    setSelectedVote(voteData.score);
                    setVote(voteData);
                    console.log("Vote data:", voteData);
                } else {
                    setSelectedVote(0);
                    setVote(null);
                }
            } catch (e) {
                console.error("Error checking vote:", e);
                setSelectedVote(0);
                setVote(null);
            }

        }
    }

    const checkReviews = async () => {
        console.log("Movie: ", content);
        if (content) {
            try {
                const reviewData = await getReviewsByContent(content.id);
                if (reviewData) {
                    const reviewsWithUserData = await Promise.all(
                        reviewData.map(async (review) => {
                            const user = await fetchUser(review.idUser);
                            return {...review, userName: user.name || `Usuario ${review.idUser}`};
                        })
                    );

                    if (user) {
                        const userReview = reviewsWithUserData.find((review) => review.idUser === user.id);
                        setHasReviewed(!!userReview);
                    }

                    setReviews(reviewsWithUserData);
                } else {
                    setReviews([]);
                    setHasReviewed(false);
                }
            } catch (e) {
                console.error("Error checking review:", e);
                setReviews([]);
            }

        }
    }

    const getContent = async () => {
        console.log("Movie id:", idContent);
        try {
            let contentFromBBDD = await fetchContentById(idContent);
            console.log("movieFromBBDD:", contentFromBBDD);
            console.log("isMovie:", isMovie);
            console.log("isSeries:", isSeries);
            if (contentFromBBDD) {
                setContent(contentFromBBDD);
            } else {
                if (contentFromNavigate && isMovie) {
                    console.log("Entra en el if");
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
                    console.log("Movie created with id:", id);

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
                    console.log("Series created with id:", id);

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
        console.log(`El usuario marcó como favorito: ${favoriteState}`);

        setIsFavorite(favoriteState);

        try {
            if (favoriteState) {
                setShowSuccessAlert(true);
                setShowWarningAlert(false);
                setTimeout(() => setShowSuccessAlert(false), 3000);

                console.log("User:", user);
                console.log("idContent:", content.id);

                await createFavorite({
                    idUser: user.id,
                    idContent: content.id,
                });
            } else {
                setShowWarningAlert(true);
                setShowSuccessAlert(false);
                setTimeout(() => setShowWarningAlert(false), 3000);

                console.log("Favorite ID:", favorite.id);

                await deleteFavorite(favorite.id);

            }
        } catch (e) {
            console.error(favoriteState ? "Error creating favorite:" : "Error deleting favorite:", e);

            setIsFavorite(!favoriteState);
        }

        await fetchUpdatedUser();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleNotificationToggle = async (notificationState) => {
        console.log(`El usuario marcó como notificado: ${notificationState}`);

        setIsNotified(notificationState);

        try {
            console.log("Favorite:", favorite);
            const updatedFavorite = await updateFavoriteAlert(favorite.id, notificationState);
            console.log("Updated Favorite:", updatedFavorite);
        } catch (e) {
            console.error("Error creating notification: ", e);
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    const handleVote = async (vote) => {
        try {
            console.log("User.id:", user.id);
            console.log("Movie.id:", content.id);
            console.log("Vote:", vote);
            await createVote({
                idContent: content.id,
                idUser: user.id,
                score: vote
            });
            // Actualiza la película con la nueva valoración emitida por el usuario
            const updatedMovie = await fetchContentById(content.id);
            console.log("Updated movie:", updatedMovie);
            setContent(updatedMovie);
        } catch (e) {
            console.error("Error creating vote:", e);
        }
        setSelectedVote(vote);
        setShowVoteMessage(true);

        console.log(`Voted: ${vote}`);
        setTimeout(() => setShowVoteMessage(false), 3000);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (newReview && newReview.trim() !== "") {
            try {
                await createReview({
                    idContent: content.id,
                    idUser: user.id,
                    text: newReview.trim(),
                });

                setNewReview("");
                checkReviews();
            } catch (e) {
                console.error("Error creating review:", e);
            }
        }
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
            {showSuccessAlert && (
                <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                    Película añadida a favoritos
                </Alert>
            )}

            {showWarningAlert && (
                <Alert variant="warning" onClose={() => setShowWarningAlert(false)} dismissible>
                    Película eliminada de favoritos
                </Alert>
            )}

            <Card>
                <Card.Img variant="top" src={`${urlImage}${content.posterPath}`} className="img-fluid"
                          style={{maxHeight: '600px', objectFit: 'cover'}}/>
                <Card.Header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <span>Película</span>
                    <div style={{display: "inline-flex", gap: "5px", alignItems: "center"}}>
                        {user.isLoggedIn && (
                            <OverlayTrigger placement="top" overlay={<Tooltip
                                id="tooltip-favorite"> {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"} </Tooltip>}>
                                <div>
                                    <FavoriteHeart onToggle={handleFavoriteToggle} isFavorite={isFavorite}/>
                                </div>
                            </OverlayTrigger>
                        )}
                        {user.isLoggedIn && isFavorite && (
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
                    <Card.Text><strong>Fecha de
                        estreno: </strong>{content.releaseDate && (convertDateToDayMonthYear(content.releaseDate))}
                    </Card.Text>
                    <Card.Text><strong>Valoración: </strong> {content.averageScore === 0 ? "Todavía no se ha valorado" : content.averageScore}
                    </Card.Text>
                </Card.Body>
            </Card>

            {user.isLoggedIn && (
                <>
                    <VotesButton selectedVote={selectedVote} handleVote={handleVote} showVoteMessage={showVoteMessage}
                                 setShowVoteMessage={setShowVoteMessage}/>
                </>
            )}

            <h3 className="mt-4">Reseñas</h3>

            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <Card key={index} className="mb-3">
                        <Card.Body>
                            <Card.Title>{review.userName}</Card.Title>
                            <Card.Text>{review.text}</Card.Text>
                            <Card.Footer className="text-muted">
                                Publicado el {convertDateToDayMonthYearTime(review.createdAt)}
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>Todavía no hay ninguna reseña para esta película. {user.isLoggedIn && (<>¡Sé el primero en
                    comentarla!</>)}</p>
            )}
            {user.isLoggedIn && !hasReviewed &&
                (<Form onSubmit={handleSubmitReview}>
                        <InputGroup>
                            <InputGroup.Text>Escribe tu reseña</InputGroup.Text>
                            <Form.Control
                                as="textarea"
                                value={newReview || ""}
                                onChange={(e) => setNewReview(e.target.value)}
                                placeholder="Comparte tu opinión sobre esta película o serie"
                                aria-label="Campo para escribir una nueva reseña"
                            />
                        </InputGroup>
                        <Button type="submit" variant="primary" className="mt-2">
                            Enviar reseña
                        </Button>
                    </Form>
                )}
            {hasReviewed && (
                <Alert variant="info">
                    ¡Gracias por dar tu opinión!
                </Alert>
            )}

        </>

    );
}

export default DetailsWrapper(MovieDetails);
