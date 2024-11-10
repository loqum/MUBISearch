import MovieCard from "./MovieCard.jsx";
import {useEffect, useContext} from "react";
import axios from "axios";
import './MovieList.css';
import {MoviesContext} from "../context/movies.context.jsx";

function MovieList(props) {

    const {movies, setMovies} = useContext(MoviesContext);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/movies/discover")
            .then((response) => {
                setMovies(response.data.data);
            });
    }, []);

    const movieCards = movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} selectMovie={props.selectMovie} imageSize="original" />
    });

    return (
        <ul className="movie-list">
            {movieCards}
        </ul>
    )
}

export default MovieList;
