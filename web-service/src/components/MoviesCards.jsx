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
                setMovies(response);
                console.log("Movies:", response);
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
