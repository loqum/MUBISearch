import {useContext, useEffect, useState} from "react";
import {Container, ProgressBar} from "react-bootstrap";
import {UserContext} from "../context/user.context.jsx";
import MovieCard from "./MovieCard.jsx";
import {MoviesContext} from "../context/movies.context.jsx";

function ProfileDetails() {

    const {user, setUser, formatDate} = useContext(UserContext);
    const {fetchMovieById} = useContext(MoviesContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);


    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            console.log("User:", JSON.parse(storedUser));
            setUser(JSON.parse(storedUser));
        }
    }, []);


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
        return <ProgressBar className={"text-center"} animated now={45}/>;
    }

    return (
        <>
            <h1>Perfil de usuario</h1>
            <Container className={"mt-lg-5 form-container"} >
                <h4>Nombre de usuario: {user.name}</h4>
                <h4>Nombre completo: {user.fullName}</h4>
                <h4>Fecha de creación: {formatDate(user.createdAt)}</h4>
                <h4>Contenidos favoritos:</h4>
                {favoriteMovies && favoriteMovies.length > 0 ? (
                    favoriteMovies.map((favorite, id) => (
                        <div key={id}>
                            <MovieCard movie={favorite} />
                        </div>
                    ))
                ) : (
                    <p>*No hay favoritos*</p>
                )}


            </Container>
        </>
    );

}

export default ProfileDetails;