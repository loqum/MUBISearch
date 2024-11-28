import MovieCard from "./MovieCard.jsx";
import React, {useContext, useEffect} from "react";
import '../assets/css/MovieList.css';
import {MoviesContext} from "../context/movies.context.jsx";

function MoviesCards() {

    const {movies, setMovies, convertMovies, fetchDiscoverMovies} = useContext(MoviesContext);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetchDiscoverMovies();
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

export default MoviesCards;
