import {Button, Card, Carousel} from "react-bootstrap";

function MovieCard(props) {

    const {movie, selectMovie} = props;

    return (
        <Card className="movie-card">
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.overview}</Card.Text>
                <Button variant="primary" onClick={() => selectMovie(movie)}>Ver detalles</Button>
            </Card.Body>
        </Card>

    );
}

export default MovieCard;
