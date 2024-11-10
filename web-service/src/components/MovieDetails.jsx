import {Card} from "react-bootstrap";
import DetailsWrapper from "../hoc/DetailsWrapper.jsx";
import {useLocation} from "react-router-dom";

function MovieDetails(props) {

    const movie = useLocation().state.movie;
    const {urlImage, formatDate} = props;

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
