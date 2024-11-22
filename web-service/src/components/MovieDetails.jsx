import {Alert, Button, ButtonGroup, Card, Form, InputGroup, ProgressBar, Spinner} from "react-bootstrap";
import DetailsWrapper from "../hoc/DetailsWrapper.jsx";
import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import FavoriteHeart from "./FavoriteHeart.jsx";
import {MoviesContext} from "../context/movies.context.jsx";
import {UserContext} from "../context/user.context.jsx";

function MovieDetails(props) {

    const {
        createFavorite,
        deleteFavorite,
        createMovie,
        fetchMoviesByIdExternal,
        getFavoriteByIdUserAndIdContent,
        formatDateISO8601,
        convertDateToDayMonthYear
    } = useContext(MoviesContext);
    const { user, setUser, triggerUserSync, fetchUpdatedUser } = useContext(UserContext);
    const {externalId} = useParams(); //Recuperar el id de la película de la URL
    const movieFromNavigate = useLocation()?.state?.movie; // Recuperar película desde la otra pantalla mediante navegación
    const {urlImage} = props;
    // const [user, setUser] = useState(null);
    const [movie, setMovie] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorite, setFavorite] = useState(null);
    const [selectedVote, setSelectedVote] = useState(null);

    useEffect(() => {
        if (!movie) {
            getMovie();
        }
    }, [externalId]);

    useEffect(() => {
        if (user && movie) {
            checkFavorite();
        }

    }, [user, movie]);

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

    const getMovie = async () => {
        console.log("Movie id:", externalId);
        try {
            const movieFromBBDD = await fetchMoviesByIdExternal(externalId);
            console.log("movieFromBBDD:", movieFromBBDD);
            if (movieFromBBDD) {
                setMovie(movieFromBBDD);
            } else {
                if (movieFromNavigate) {
                    await createMovie({
                        originalTitle: movieFromNavigate.original_title,
                        releaseDate: formatDateISO8601(movieFromNavigate.release_date),
                        idExternal: movieFromNavigate.id,
                        title: movieFromNavigate.title,
                        plot: movieFromNavigate.overview,
                        posterPath: movieFromNavigate.poster_path,
                        genres: movieFromNavigate.genres,
                    });

                    const savedMovie = await fetchMoviesByIdExternal(externalId);
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
        if (favoriteState) {
            setShowSuccessAlert(true);
            setShowWarningAlert(false);
            setTimeout(() => setShowSuccessAlert(false), 3000);


            try {
                console.log("User:", user);
                console.log("idContent:", movie.id);
                await createFavorite({
                    idUser: user.id,
                    idContent: movie.id,
                });
            } catch (e) {
                console.error("Error creating favorite:", e);
            }

        } else {
            setShowWarningAlert(true);
            setShowSuccessAlert(false);
            triggerUserSync();
            await fetchUpdatedUser();
            setTimeout(() => setShowWarningAlert(false), 3000);
            console.log("Favorite ID:", favorite.id);
            try {
                await deleteFavorite(favorite.id);
            } catch (e) {
                console.error("Error deleting favorite:", e);
            }
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setIsFavorite(favoriteState);
    };

    const handleVote = (vote) => {
        setSelectedVote(vote);
        console.log(`Voted: ${vote}`);
    };

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
                <Card.Header
                    style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>Película {user && (
                    <FavoriteHeart onToggle={handleFavoriteToggle} isFavorite={isFavorite}/>)} </Card.Header>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Card.Text>
                        <strong>Géneros: </strong>{Object.values(movie.genres).join(', ')}
                    </Card.Text>
                    <Card.Text><strong>Fecha de
                        estreno: </strong>{movie.releaseDate && (convertDateToDayMonthYear(movie.releaseDate))}
                    </Card.Text>
                    <Card.Text><strong>Valoración: </strong>{movie.voteAverage}</Card.Text>
                </Card.Body>
            </Card>

            <h3 className="mt-4">Vota la película:</h3>
            <ButtonGroup>
                {[...Array(10)].map((_, index) => (
                    <Button
                        key={index + 1}
                        variant={selectedVote === index + 1 ? "primary" : "outline-primary"}
                        onClick={() => handleVote(index + 1)}
                    >
                        {index + 1}
                    </Button>
                ))}
            </ButtonGroup>
            {selectedVote && <p>Has votado: {selectedVote}</p>}

            <h3 className="mt-4">Reseñas</h3>
            {user && (<Form>
                    <InputGroup>
                        <InputGroup.Text>Escribe tu reseña</InputGroup.Text>
                        <Form.Control
                            as="textarea"
                            // value={newReview}
                            // onChange={(e) => setNewReview(e.target.value)}
                            placeholder="Comparte tu opinión sobre esta película o serie"
                            aria-label="Campo para escribir una nueva reseña"
                        />
                    </InputGroup>
                    <Button type="submit" variant="primary" className="mt-2">
                        Enviar reseña
                    </Button>
                </Form>
            )}


        </>

    );
}

export default DetailsWrapper(MovieDetails);
