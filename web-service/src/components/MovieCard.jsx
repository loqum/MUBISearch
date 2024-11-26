import {Button, Card} from "react-bootstrap";
import {useContext, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {useNavigate} from "react-router-dom";
import {ChevronDown, ChevronUp} from "react-bootstrap-icons";

function MovieCard(props) {

    const {movie} = props;
    const {urlImage} = useContext(MoviesContext);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        console.log("MovieCard handleClick movie id:", movie.id);
        navigate(`/details/${movie.id}`, {state: {movie}});
    }

    const toggleExpand = () => {
        setExpanded(!expanded);
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${urlImage}${movie.posterPath}`} className="img-fluid"/>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text
                    style={{
                        textAlign: 'justify',
                        display: '-webkit-box',
                        WebkitLineClamp: expanded ? 'none' : 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: expanded ? 'visible' : 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {movie.plot}
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={handleClick}>Ver detalles</Button>
                    {movie.plot?.length > 150 && (
                        <Button variant="link" onClick={toggleExpand} className="p-0"
                                style={{ fontSize: '1.5rem' }}
                                aria-label={expanded ? "Ver más contenido" : "Ver menos contenido"}
                        >
                            {expanded ? <ChevronUp /> : <ChevronDown />}
                        </Button>

                    )}
                </div>
            </Card.Body>
        </Card>

    );
}

export default MovieCard;
