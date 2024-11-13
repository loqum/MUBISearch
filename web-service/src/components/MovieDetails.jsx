import {Card} from "react-bootstrap";
import DetailsWrapper from "../hoc/DetailsWrapper.jsx";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FetchMoviesByIdExternal from "../services/FetchMovieByIdExternal.jsx";

function MovieDetails(props) {

    const { externalId } = useParams(); //Recuperar el id de la película de la URL
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
        console.log("externalId:", externalId);
        console.log("urlImage: ", urlImage);
        console.log("formatDate: ", formatDate);
        console.log("Movie before:", movie);
        if (!movie) {
            getMovie();
            console.log("Movie after:", movie);
        }
    }, [externalId]);

    if (!movie) {
        return <div>Cargando película...</div>;
    }

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
