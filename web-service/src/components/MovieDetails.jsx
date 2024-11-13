import {Card} from "react-bootstrap";
import DetailsWrapper from "../hoc/DetailsWrapper.jsx";
import {useLocation, useParams} from "react-router-dom";
import FetchMoviesByIdExternal from "../services/FetchMovieByIdExternal.jsx";
import {useEffect, useState} from "react";

function MovieDetails(props) {

    const {id} = useParams();
    const movieFromNavigate = useLocation().state.movie; // Recuperar película desde la otra pantalla mediante navegación
    const {urlImage, formatDate} = props;
    const [movie, setMovie] = useState(null);

    const getMovie = async () => {
        console.log("Movie id:", id);
        try {
            const response = await FetchMoviesByIdExternal(id);
            console.log("Response:", response);
            if (response && response.id) {
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
    }, [id]);

    return (
        <Card className="text-center">
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
    );
}

export default DetailsWrapper(MovieDetails);
