import {Col, Row, Spinner} from "react-bootstrap";
import MovieCard from "./MovieCard.jsx";
import {useContext, useEffect, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {UserContext} from "../context/user.context.jsx";

export const Favorites = () => {

    const {fetchMovieById, getReviewsByUser, deleteReview} = useContext(MoviesContext);
    const {user, setUser, formatDate} = useContext(UserContext);
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
        </>
    )
}