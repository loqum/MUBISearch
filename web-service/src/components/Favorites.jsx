import {Col, Row, Spinner} from "react-bootstrap";
import ContentCard from "./ContentCard.jsx";
import {useContext, useEffect, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {UserContext} from "../context/user.context.jsx";

export const Favorites = () => {

    const {fetchContentById} = useContext(MoviesContext);
    const {user} = useContext(UserContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            if (user && user.favorites) {
                try {
                    const moviesList = await Promise.all(
                        user.favorites.map(async (favorite) => {
                            return await fetchContentById(favorite.idContent);
                        })
                    );

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
            <h4 className={"mt-4 mb-4"}>Favoritos</h4>
            {favoriteMovies && favoriteMovies.length > 0 ? (
                <Row xs={1} md={3} className="g-4">
                    {favoriteMovies.map((favorite, id) => (
                        <Col key={id}>
                            <ContentCard content={favorite}/>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>No tienes favoritos. ¡Añade alguna película o serie!</p>
            )}
        </>
    )
}