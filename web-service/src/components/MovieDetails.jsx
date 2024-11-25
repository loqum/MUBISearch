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

    const {
        urlImage,
        createFavorite,
        deleteFavorite,
        createMovie,
        fetchMovieById,
        getFavoriteByIdUserAndIdContent,
        formatDateISO8601,
        convertDateToDayMonthYear,
        convertDateToDayMonthYearTime,
        getVoteByUserAndContent,
        createVote,
        createReview,
        getReviewsByContent
    } = useContext(MoviesContext);
    const {user, setUser, triggerUserSync, fetchUpdatedUser, fetchUser} = useContext(UserContext);
    const {idMovie} = useParams(); //Recuperar el id de la película de la URL
    const movieFromNavigate = useLocation()?.state?.movie; // Recuperar película desde la pantalla anterior mediante navegación
    // const {urlImage} = props;
    const [movie, setMovie] = useState(null);
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
        if (!movie) {
            getMovie();
        }
    }, [idMovie]);

    useEffect(() => {
        if (user && movie) {
            checkFavorite();
        }

    }, [user, movie]);

    useEffect(() => {
        if (user && movie) {
            checkVote();
        }

    }, [user, movie]);


    useEffect(() => {
        if (movie) {
            checkReviews();
        }
    }, [movie]);

    const checkFavorite = async () => {
        console.log("User: ", user);
        if (user && movie) {
            try {
                const favoriteData = await getFavoriteByIdUserAndIdContent(user, movie);
                if (favoriteData) {
                    setIsFavorite(true);
                    setFavorite(favoriteData);
                    console.log("Favorite data:", favoriteData);
                } else {
                    setIsFavorite(false);
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
        if (user && movie) {
            try {
                const voteData = await getVoteByUserAndContent(user, movie);
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
        console.log("Movie: ", movie);
        if (movie) {
            try {
                const reviewData = await getReviewsByContent(movie.id);
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

    const getMovie = async () => {
        console.log("Movie id:", idMovie);
        try {
            const movieFromBBDD = await fetchMovieById(idMovie);
            console.log("movieFromBBDD:", movieFromBBDD);
            if (movieFromBBDD) {
                setMovie(movieFromBBDD);
            } else {
                if (movieFromNavigate) {
                    const id = await createMovie({
                        originalTitle: movieFromNavigate.original_title,
                        releaseDate: formatDateISO8601(movieFromNavigate.release_date),
                        id: movieFromNavigate.id,
                        title: movieFromNavigate.title,
                        plot: movieFromNavigate.overview,
                        posterPath: movieFromNavigate.poster_path,
                        genres: movieFromNavigate.genres,
                        averageScore: 0
                    });
                    console.log("Movie created with id:", id);

                    const savedMovie = await fetchMovieById(id);
                    setMovie(savedMovie);
                }
            }
        } catch (e) {
            console.error("Error fetching or creating movie:", e);
            setMovie(movieFromNavigate);
        }
    };

    const handleFavoriteToggle = async (favoriteState) => {
        console.log(`El usuario marcó como favorito: ${favoriteState}`);

        // Actualiza el estado local inmediatamente
        setIsFavorite(favoriteState);

        try {
            if (favoriteState) {
                setShowSuccessAlert(true);
                setShowWarningAlert(false);
                setTimeout(() => setShowSuccessAlert(false), 3000);

                console.log("User:", user);
                console.log("idContent:", movie.id);

                await createFavorite({
                    idUser: user.id,
                    idContent: movie.id,
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

    }


    const handleVote = async (vote) => {
        try {
            console.log("User.id:", user.id);
            console.log("Movie.id:", movie.id);
            console.log("Vote:", vote);
            await createVote({
                idContent: movie.id,
                idUser: user.id,
                score: vote
            });
            // Actualiza la película con la nueva valoración emitida por el usuario
            const updatedMovie = await fetchMovieById(movie.id);
            console.log("Updated movie:", updatedMovie);
            setMovie(updatedMovie);
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
                    idContent: movie.id,
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

    if (!movie) {
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
                <Card.Img variant="top" src={`${urlImage}${movie.posterPath}`} className="img-fluid"
                          style={{maxHeight: '600px', objectFit: 'cover'}}/>
                <Card.Header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <span>Película</span>
                    <div style={{display: "inline-flex", gap: "5px", alignItems: "center"}}>
                        {user.isLoggedIn && (
                            <OverlayTrigger placement="top" overlay={<Tooltip
                                id="tooltip-favorite"> {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"} </Tooltip>}>
                                <FavoriteHeart onToggle={handleFavoriteToggle} isFavorite={isFavorite}/>
                            </OverlayTrigger>
                        )}
                        {user.isLoggedIn && isFavorite && (
                            <OverlayTrigger placement="top" overlay={<Tooltip
                                id="tooltip-notification"> {isNotified ? "Desactivar notificaciones" : "Activar notificaciones"} </Tooltip>}>
                                <NotificationBell onToggle={handleNotificationToggle} isNotified={isNotified}/>
                            </OverlayTrigger>
                        )}
                    </div>
                </Card.Header>

                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Card.Text>
                        <strong>Géneros: </strong>{Object.values(movie.genres).join(', ')}
                    </Card.Text>
                    <Card.Text><strong>Fecha de
                        estreno: </strong>{movie.releaseDate && (convertDateToDayMonthYear(movie.releaseDate))}
                    </Card.Text>
                    <Card.Text><strong>Valoración: </strong> {movie.averageScore === 0 ? "Todavía no se ha valorado" : movie.averageScore}
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

export default React.memo(DetailsWrapper(MovieDetails));
