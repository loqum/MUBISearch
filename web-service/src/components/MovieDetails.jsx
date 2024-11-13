import {Button, Card, Container, Form, InputGroup} from "react-bootstrap";
import DetailsWrapper from "../hoc/DetailsWrapper.jsx";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FetchMoviesByIdExternal from "../services/FetchMovieByIdExternal.jsx";

function MovieDetails(props) {

    const {externalId} = useParams(); //Recuperar el id de la película de la URL
    const movieFromNavigate = useLocation()?.state?.movie; // Recuperar película desde la otra pantalla mediante navegación
    const {urlImage, formatDate} = props;

    const [movie, setMovie] = useState(null);

    const getMovie = async () => {
        console.log("Movie id:", externalId);
        try {
            const response = await FetchMoviesByIdExternal(externalId);
            console.log("Response:", response);
            if (response && response.externalId) {
                setMovie(response);
            } else {
                setMovie(movieFromNavigate);
            }
        } catch (e) {
            console.error("Error fetching movies:", e);
            setMovie(movieFromNavigate);
        }
    };

    useEffect(() => {
        if (!movie) {
            getMovie();
        }
    }, [externalId]);

    if (!movie) {
        return <div>Cargando película...</div>;
    }

    return (
        <>
            <Card>
                <Card.Img variant="top" src={`${urlImage}${movie.poster_path}`} className="img-fluid"
                          style={{maxHeight: '600px', objectFit: 'cover'}}/>
                <Card.Header>Película</Card.Header>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.overview}</Card.Text>
                    <Card.Text>
                        <strong>Géneros: </strong>{Object.values(movie.genres).join(', ')}
                    </Card.Text>
                    <Card.Text><strong>Fecha de estreno: </strong>{formatDate(movie.release_date)}</Card.Text>
                </Card.Body>
            </Card>

            <h3 className="mt-4">Añadir tu reseña</h3>
            <Form >
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
        </>

    );
}

export default DetailsWrapper(MovieDetails);
