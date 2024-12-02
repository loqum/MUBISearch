import {Button, Card} from "react-bootstrap";
import {useContext, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {useNavigate} from "react-router-dom";
import {ChevronDown, ChevronUp} from "react-bootstrap-icons";

function ContentCard(props) {

    const { content, isMovie, isSeries } = props;
    const {urlImage, resolutionImageCard} = useContext(MoviesContext);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        console.log("ContentCard handleClick movie id:", content.id);
        navigate(`/details/${content.id}`, { state: { content, isMovie, isSeries } });
    }

    const toggleExpand = () => {
        setExpanded(!expanded);
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${urlImage}${resolutionImageCard}${content.posterPath}`} className="img-fluid" loading="lazy"/>
            <Card.Body>
                <Card.Title>{content.title}</Card.Title>
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
                    {content.plot}
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={handleClick}>Ver detalles</Button>
                    {content.plot?.length > 150 && (
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

export default ContentCard;
