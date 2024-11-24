import MovieCard from "./MovieCard.jsx";
import React, {useContext, useEffect} from "react";
import '../assets/css/MovieList.css';
import {MoviesContext} from "../context/movies.context.jsx";
import FetchDiscoverMovies from "../services/FetchDiscoverMovies.jsx";
import {Spinner} from "react-bootstrap";

function MoviesCards() {

    const {movies, setMovies, convertMovies} = useContext(MoviesContext);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await FetchDiscoverMovies();
                const transformedMovies = convertMovies(response);
                setMovies(transformedMovies);
                console.log("Movies:", transformedMovies);
                console.log("Response Movies:", response);
            } catch (e) {
                console.error("Error fetching movies:", e);
            }
        };

        fetchMovies();

    }, [setMovies]);

    const movieCards = movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} imageSize="original" />
    });

    return (
        <ul className="movie-list">
            {movieCards}
        </ul>
    )
}

export default React.memo(MoviesCards);
