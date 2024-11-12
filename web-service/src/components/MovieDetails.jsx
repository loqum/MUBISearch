import {Card} from "react-bootstrap";
import DetailsWrapper from "../hoc/DetailsWrapper.jsx";
import {useLocation, useParams} from "react-router-dom";
import FetchMovies from "../services/FetchMovies.jsx";
import FetchMoviesByIdExternal from "../services/FetchMovieByIdExternal.jsx";

function MovieDetails(props) {

    const movieFromDB = useParams();
    const movieFromNavigate = useLocation().state.movie; // Recuperar película desde la otra pantalla mediante navegación
    const {urlImage, formatDate} = props;

    const getMovie = async () => {
        const id = movieFromDB.movie.id;
        console.log("Movie id:", id);
        if (movieFromDB) {
            try {
                let response = await FetchMoviesByIdExternal(id);
                console.log("Response:", response);
                return response;
            } catch (e) {
                console.error("Error fetching movies:", e);
            }
        } else {
            return movieFromNavigate;
        }
    }

    return (
        <Card className="text-center">
            <Card.Img variant="top" src={`${urlImage}${movie.poster_path}`} className="img-fluid" style={{maxHeight: '600px', objectFit: 'cover'}}/>
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
