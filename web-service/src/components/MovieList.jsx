import MovieCard from "./MovieCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import './MovieList.css';

function MovieList(props) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/movies/discover")
            .then((response) => {
                setMovies(response.data.data);
                console.log(response.data.data);
            });
    }, []);

    const movieCards = movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} selectMovie={props.selectMovie} />
    });

    return (
        <ul className="movie-list">
            {movieCards}
        </ul>
    )
}

export default MovieList;
