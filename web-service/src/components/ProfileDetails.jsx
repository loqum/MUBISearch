import {useContext, useEffect, useState} from "react";
import {Card, Col, Container, ProgressBar, Row, Spinner} from "react-bootstrap";
import {UserContext} from "../context/user.context.jsx";
import MovieCard from "./MovieCard.jsx";
import {MoviesContext} from "../context/movies.context.jsx";

function ProfileDetails() {

    const {user, setUser, formatDate} = useContext(UserContext);
    const {fetchMovieById} = useContext(MoviesContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

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
                        <h4>Películas favoritas</h4>
                        {favoriteMovies && favoriteMovies.length > 0 ? (
                            <Row xs={1} md={3} className="g-4">
                                {favoriteMovies.map((favorite, id) => (
                                    <Col key={id}>
                                        <MovieCard movie={favorite} />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <p>*No hay favoritos*</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );

}

export default ProfileDetails;