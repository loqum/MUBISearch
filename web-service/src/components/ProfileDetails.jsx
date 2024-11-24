import {useContext, useEffect, useState} from "react";
import {Card, Col, Container, ListGroup, ProgressBar, Row, Spinner} from "react-bootstrap";
import {UserContext} from "../context/user.context.jsx";
import MovieCard from "./MovieCard.jsx";
import {MoviesContext} from "../context/movies.context.jsx";

function ProfileDetails() {

    const {user, setUser, formatDate} = useContext(UserContext);
    const {fetchMovieById, getReviewsByUser, deleteReview} = useContext(MoviesContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [reviews, setReviews] = useState([]);

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


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const userReviews = await getReviewsByUser(user.id);
                console.log("User reviews:", userReviews);

                const reviewsWithContent = await Promise.all(
                    userReviews.map(async (review) => {
                        const movie = await fetchMovieById(review.idContent);
                        console.log("Movie:", movie);
                        return {...review, movieTitle: movie.title};
                    })
                );
                console.log("Reviews with content:", reviewsWithContent);
                setReviews(reviewsWithContent);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        }
        fetchReviews();
    }, [user]);

    const handleDeleteReview = async (id) => {
        try {
            await deleteReview(id);
            setReviews((prevReviews) =>
                prevReviews.filter((review) => review.id !== id)
            );
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };


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
                        <h4 className={"mb-4 mt-4"}>Reseñas realizadas</h4>
                        {reviews && reviews.length > 0 ? (
                            <ListGroup>
                                {reviews.map((review, index) => (
                                    <ListGroup.Item key={index} className={`mb-4 ${index !== 0 ? "border-top" : ""} position-relative`}>
                                        <i
                                            className="bi bi-trash-fill text-danger position-absolute"
                                            style={{
                                                top: "10px",
                                                right: "10px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleDeleteReview(review.id)}

                                        ></i>
                                        <h5 className="mb-2">{review.movieTitle}</h5>
                                        <p>{review.text}</p>
                                        <small className="text-muted">
                                            Publicado el {formatDate(review.createdAt)}
                                        </small>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>*No has realizado ninguna reseña*</p>
                        )}
                    </Col>
                </Row>

            </Container>
        </>
    );

}

export default ProfileDetails;