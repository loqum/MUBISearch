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

    const convertDateToDayMonthYearTime = (dateString) => {
        if (!dateString) return "Fecha no disponible";

        try {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const seconds = String(date.getSeconds()).padStart(2, "0");

            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        } catch (error) {
            console.error("Error al convertir la fecha:", error);
            return "Formato de fecha inválido";
        }
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

    const createVote = async (vote) => {
        try {
            if (vote) {
                console.log("createVote vote:", vote);
                const response = await axios({
                    method: 'POST',
                    url: 'http://localhost:8080/api/v1/votes/create',
                    data: vote,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log("createVote response:", response);
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }

    const createReview = async (review) => {
        try {
            if (review) {
                console.log("createReview review:", review);
                const response = await axios({
                    method: 'POST',
                    url: 'http://localhost:8080/api/v1/reviews/create',
                    data: review,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log("createReview response:", response);
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }

    const getVoteByUserAndContent = async (user, movie) => {
        try {
            const response = await axios({
                method: "GET",
                url: `http://localhost:8080/api/v1/votes/user/${user.id}/content/${movie.id}`,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log("getVoteByUserAndContent response:", response);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const getReviewsByContent = async (idContent) => {
        try {
            const response = await axios({
                method: "GET",
                url: `http://localhost:8080/api/v1/reviews/idContent/${idContent}`,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log("getReviewsByContent response:", response);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

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
            convertDateToDayMonthYearTime,
            convertMovies,
            getVoteByUserAndContent,
            createVote,
            createReview,
            getReviewsByContent
        }}>
            {props.children}
        </MoviesContext.Provider>
    )
}

export {MoviesContext, MoviesProviderWrapper}