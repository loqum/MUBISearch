import MovieCard from "./MovieCard.jsx";
import {useContext, useEffect} from "react";
import '../assets/css/MovieList.css';
import {MoviesContext} from "../context/movies.context.jsx";
import FetchDiscoverMovies from "../services/FetchDiscoverMovies.jsx";

function MoviesCards(props) {

    const {movies, setMovies} = useContext(MoviesContext);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await FetchDiscoverMovies();
                const transformedMovies = response.map((movie) => ({
                    ...movie,
                    posterPath: movie.poster_path,
                    releaseDate: movie.release_date,
                    plot: movie.overview,
                }));
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
