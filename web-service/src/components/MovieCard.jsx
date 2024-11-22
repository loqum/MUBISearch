import {Button, Card, Carousel} from "react-bootstrap";
import {useContext} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {useNavigate} from "react-router-dom";

function MovieCard(props) {

    const {movie} = props;
    const {urlImage} = useContext(MoviesContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details/${movie.id}`, {state: {movie}});
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${urlImage}${movie.posterPath}`} className="img-fluid"/>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text style={{ textAlign: 'justify' }}>{movie.plot}</Card.Text>
                <Button variant="primary" onClick={handleClick}>Ver detalles</Button>
            </Card.Body>
        </Card>

    );
}

export default MovieCard;
