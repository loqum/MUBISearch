import {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Container, ListGroup, Modal, ProgressBar, Row, Spinner} from "react-bootstrap";
import {UserContext} from "../context/user.context.jsx";
import MovieCard from "./MovieCard.jsx";
import {MoviesContext} from "../context/movies.context.jsx";
import {Link} from "react-router-dom";
import {Notifications} from "./Notifications.jsx";
import {Reviews} from "./Reviews.jsx";

function ProfileDetails() {

    const {user, setUser, formatDate} = useContext(UserContext);
    const {fetchMovieById, getReviewsByUser, deleteReview} = useContext(MoviesContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    // const [reviews, setReviews] = useState([]);
    // const [selectedReview, setSelectedReview] = useState(null);
    // const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            if (user && user.favorites) {
                console.log("User:", user);
                console.log("User favorites:", user.favorites);
                try {
                    const moviesList = await Promise.all(
                        user.favorites.map(async (favorite) => {
                            return await fetchMovieById(favorite.idContent);
                        })
                    );

                    console.log("Movies list:", moviesList);
                    setFavoriteMovies(moviesList);
                } catch (error) {
                    console.error("Error fetching movies:", error);
                }
            }
        };
        fetchFavoriteMovies();
    }, [user]);

    if (!favoriteMovies) {
        return (
            <Spinner animation="border" role="status">
                <p className="mt-3">Cargando información...</p>
            </Spinner>
        );
    }

    return (
        <>
            <Container className="mt-5">
                <Row className="mb-4">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Perfil de usuario</Card.Title>
                                <Card.Text><strong>Nombre de usuario:</strong> {user.name}</Card.Text>
                                <Card.Text><strong>Nombre completo:</strong> {user.fullName}</Card.Text>
                                <Card.Text><strong>Fecha de creación:</strong> {formatDate(user.createdAt)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h4 className={"mt-4 mb-4"}>Películas favoritas</h4>
                        {favoriteMovies && favoriteMovies.length > 0 ? (
                            <Row xs={1} md={3} className="g-4">
                                {favoriteMovies.map((favorite, id) => (
                                    <Col key={id}>
                                        <MovieCard movie={favorite}/>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <p>*No hay favoritos*</p>
                        )}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Reviews/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Notifications/>
                    </Col>
                </Row>

            </Container>
        </>
    );

}

export default ProfileDetails;