import MovieCard from "./MovieCard.jsx";
import '../assets/css/MovieList.css';
import {useLocation} from "react-router-dom";
import {Container} from "react-bootstrap";

function MovieList(props) {

    const movies = useLocation().state.response;

    const movieCards = movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} selectMovie={props.selectMovie} imageSize="original"/>
    });

    return (<Container>
        <h1>Resultados</h1>
        <ul className="movie-list">
            {movieCards}
        </ul>
    </Container>)
}

export default MovieList;
