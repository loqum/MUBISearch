import {createContext, useState} from 'react';
import axios from "axios";

const MoviesContext = createContext();

function MoviesProviderWrapper(props) {

    const [movies, setMovies] = useState([]);
    const [urlImage, setUrlImage] = useState('https://image.tmdb.org/t/p/original');

    const formatDateISO8601 = (date) => {
        return new Date(date).toISOString().split("T")[0];
    }

    const convertDateToDayMonthYear = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    };

    const createFavorite = async (favorite) => {
        try {
            if (favorite) {
                const response = await axios({
                    method: 'POST',
                    url: 'http://localhost:8080/api/v1/favorites/create',
                    data: favorite,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log("createFavorite response:", response);
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    };

    const deleteFavorite = async (id) => {
        try {
            if (id) {
                const response = await axios({
                    method: 'DELETE',
                    url: `http://localhost:8080/api/v1/favorites/delete/${id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log("deleteFavorite response:", response);
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    };

    const createMovie = async (movie) => {
        try {
            if (movie) {
                const response = await axios({
                    method: 'POST',
                    url: 'http://localhost:8080/api/v1/movies/create',
                    data: movie,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log("createMovie response:", response);
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    };

    const getFavoriteByIdUserAndIdContent = async (user, movie) => {
        try {
            const response = await axios({
                method: "GET",
                url: `http://localhost:8080/api/v1/favorites/user/${user.id}/content/${movie.id}`,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log("getFavoriteByIdUserAndIdContent response:", response);
            return response.data;
        } catch (error) {
            throw error;
        }

    }

    const fetchMoviesByIdExternal = async (idExternal) => {
        try {
            if (idExternal) {
                const response = await axios.get(`http://localhost:8080/api/v1/movies/idExternal/${idExternal}`);
                console.log("FetchMovieByIdExternal response:", response);
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching movie:", error);
            throw error;
        }
    };

    const fetchMovieById = async (id) => {
        try {
            if (id) {
                console.log("fetchMovieById id:", id);
                const response = await axios.get(`http://localhost:8080/api/v1/movies/id/${id}`);
                console.log("fetchMovieById response:", response);
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching movie:", error);
            throw error;
        }
    };

    const convertMovies = (movies) => {
        console.log("convertMovies movies:", movies);
        return movies.map((movie) => ({
            ...movie,
            posterPath: movie.poster_path,
            releaseDate: movie.release_date,
            plot: movie.overview,
        }));
    };

    return (
        <MoviesContext.Provider value={{
            movies,
            setMovies,
            urlImage,
            setUrlImage,
            createFavorite,
            deleteFavorite,
            createMovie,
            fetchMoviesByIdExternal,
            fetchMovieById,
            getFavoriteByIdUserAndIdContent,
            formatDateISO8601,
            convertDateToDayMonthYear,
            convertMovies
        }}>
            {props.children}
        </MoviesContext.Provider>
    )
}

export {MoviesContext, MoviesProviderWrapper}