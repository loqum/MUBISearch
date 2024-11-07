import {Card, Carousel, CarouselItem} from "react-bootstrap";

function MovieDetails(props) {

    const {movie} = props;

    return (
        <Card style={{ width: '18rem' }} className="selected-movie">
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.overview}</Card.Text>
                <Card.Text>Fecha de estreno: {movie.release_date}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default MovieDetails;
