import {Alert, Button, Card, Container, Form, InputGroup} from "react-bootstrap";
import DetailsWrapper from "../hoc/DetailsWrapper.jsx";
import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import FetchMoviesByIdExternal from "../services/FetchMovieByIdExternal.jsx";
import FavoriteHeart from "./FavoriteHeart.jsx";
import {MoviesContext} from "../context/movies.context.jsx";

function MovieDetails(props) {

    const {createFavorite, createMovie, formatDateISO8601, convertDateToDayMonthYear} = useContext(MoviesContext);
    const {externalId} = useParams(); //Recuperar el id de la película de la URL
    const movieFromNavigate = useLocation()?.state?.movie; // Recuperar película desde la otra pantalla mediante navegación
    const {urlImage} = props;
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    );
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [movie, setMovie] = useState(null);

    const getMovie = async () => {
        console.log("Movie id:", externalId);
        try {
            const movieFromBBDD = await FetchMoviesByIdExternal(externalId);
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

                    const savedMovie = await FetchMoviesByIdExternal(externalId);
                    setMovie(savedMovie);
                }
            }
        } catch (e) {
            console.error("Error fetching or creating movie:", e);
            setMovie(movieFromNavigate);
        }
    };

    useEffect(() => {
        if (!movie) {
            getMovie();
        }
    }, [externalId]);

    const handleFavoriteToggle = async (isFavorite) => {
        console.log(`El usuario marcó como favorito: ${isFavorite}`);
        if (isFavorite) {
            setShowSuccessAlert(true);
            setShowWarningAlert(false);
            setTimeout(() => setShowSuccessAlert(false), 3000);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

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
            setTimeout(() => setShowWarningAlert(false), 3000);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    if (!movie) {
        return <div>Cargando película...</div>;
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
                    <FavoriteHeart onToggle={handleFavoriteToggle}/>)} </Card.Header>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Card.Text>
                        <strong>Géneros: </strong>{Object.values(movie.genres).join(', ')}
                    </Card.Text>
                    <Card.Text><strong>Fecha de
                        estreno: </strong>{movie.releaseDate && (convertDateToDayMonthYear(movie.releaseDate))}
                    </Card.Text>
                </Card.Body>
            </Card>

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
