import {createContext, useState} from 'react';
import axios from "axios";

const MoviesContext = createContext();

function MoviesProviderWrapper(props) {

    const [movies, setMovies] = useState([]);
    const [urlImage] = useState('https://image.tmdb.org/t/p/');
    const resolutionImageCard = "w300";
    const resolutionImageDetail = "original";

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
            const month = String(date.getMonth() + 1).padStart(2, "0");
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

    const fetchDiscoverMovies = async (page) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `http://localhost:8080/api/v1/movies/discover/${page}`,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log("FetchDiscoverMovies response:", response.data.data);

            return response.data.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    };

    const fetchMovies = async (title) => {
        try {
            if (title) {
                const response = await axios({
                    method: 'GET',
                    url: `http://localhost:8080/api/v1/movies/title/${title}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log("FetchDiscoverMovies response:", response);
                return response.data.data;
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    };

    const fetchSeries = async (title) => {
        try {
            if (title) {
                const response = await axios({
                    method: 'GET',
                    url: `http://localhost:8080/api/v1/series/title/${title}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log("FetchSeries response:", response);
                return response.data.data;
            }
        } catch (error) {
            console.error("Error fetching series:", error);
            throw error;
        }
    };

    const createFavorite = async (favorite) => {
        try {
            if (favorite) {
                console.log("createFavorite favorite:", favorite);
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
            console.error("Error creating favorite:", error);
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
            console.error("Error deleting favorite:", error);
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
            console.error("Error creating movie:", error);
            throw error;
        }
    };

    const createSeries = async (series) => {
        try {
            if (series) {
                const response = await axios({
                    method: 'POST',
                    url: 'http://localhost:8080/api/v1/series/create',
                    data: series,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log("createSeries response:", response);
                return response.data;
            }
        } catch (error) {
            console.error("Error creating series:", error);
            throw error;
        }
    };

    const getFavoriteByIdUserAndIdContent = async (user, content) => {
        try {
            if (user && content) {
                const response = await axios({
                    method: "GET",
                    url: `http://localhost:8080/api/v1/favorites/user/${user.id}/content/${content.id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    validateStatus: (status) => status === 200 || status === 404,
                });

                if (response.status === 404) {
                    return null;
                }

                return response.data;
            }
        } catch (error) {
            console.error("Error fetching favorite by user and content: ", error);
        }

    }

    const fetchMovieById = async (id) => {
        try {
            if (id) {
                const response = await axios({
                    method: 'GET',
                    url: `http://localhost:8080/api/v1/movies/id/${id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching movie:", error);
            throw error;
        }
    };

    const fetchSeriesById = async (id) => {
        try {
            if (id) {
                const response = await axios({
                    method: 'GET',
                    url: `http://localhost:8080/api/v1/series/id/${id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching series:", error);
            throw error;
        }
    }

    const fetchContentById = async (id) => {
        try {
            if (id) {
                const response = await axios({
                    method: 'GET',
                    url: `http://localhost:8080/api/v1/contents/id/${id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching content:", error);
        }
    }

    const createVote = async (vote) => {
        try {
            if (vote) {
                return await axios({
                    method: 'POST',
                    url: 'http://localhost:8080/api/v1/votes/create',
                    data: vote,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
        } catch (error) {
            console.error("Error creating vote:", error);
            throw error;
        }
    }

    const createReview = async (review) => {
        try {
            if (review) {
                const response = await axios({
                    method: 'POST',
                    url: 'http://localhost:8080/api/v1/reviews/create',
                    data: review,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                return response.data;
            }
        } catch (error) {
            console.error("Error creating review:", error);
            throw error;
        }
    }

    const getVoteByUserAndContent = async (user, movie) => {
        try {
            if (user && movie) {
                const response = await axios({
                    method: "GET",
                    url: `http://localhost:8080/api/v1/votes/user/${user.id}/content/${movie.id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching vote by user and content:", error);
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
            return response.data;
        } catch (error) {
            console.error("Error fetching reviews by content:", error);
            throw error;
        }
    }

    const getReviewsByUser = async (idUser) => {
        try {
            const response = await axios({
                method: "GET",
                url: `http://localhost:8080/api/v1/reviews/idUser/${idUser}`,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return response.data;
        } catch (error) {
            console.error("Error fetching reviews by user:", error);
            throw error;
        }
    }

    const deleteReview = async (id) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `http://localhost:8080/api/v1/reviews/delete/${id}`,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return response.data;
        } catch (error) {
            console.error("Error deleting review:", error);
            throw error;
        }
    }

    const convertMovies = (movies) => {
        return movies.map((movie) => ({
            ...movie,
            posterPath: movie.poster_path,
            backdropPath: movie.backdrop_path,
            releaseDate: movie.release_date,
            plot: movie.overview,
        }));
    };

    const convertSeries = (seriesList) => {
        return seriesList.map((series) => ({
            ...series,
            posterPath: series.poster_path,
            backdropPath: series.backdrop_path,
            releaseDate: series.release_date,
            plot: series.overview,
            firstAir: series.first_air_date,
            originCountry: series.origin_country,
            originalName: series.original_name,
        }));
    };

    const updateFavoriteAlert = async (idFavorite, notificationState) => {
        try {
            if (idFavorite) {
                const response = await axios({
                    method: 'PATCH',
                    url: `http://localhost:8080/api/v1/favorites/update/${idFavorite}`,
                    data: notificationState,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                return response.data;
            }
        } catch (error) {
            console.error("Error updating favorite alert:", error);
            throw error;
        }

    }

    return (
        <MoviesContext.Provider value={{
            movies,
            setMovies,
            urlImage,
            resolutionImageCard,
            resolutionImageDetail,
            fetchDiscoverMovies,
            fetchMovies,
            fetchSeries,
            createFavorite,
            deleteFavorite,
            createMovie,
            createSeries,
            fetchMovieById,
            fetchSeriesById,
            fetchContentById,
            getFavoriteByIdUserAndIdContent,
            formatDateISO8601,
            convertDateToDayMonthYear,
            convertDateToDayMonthYearTime,
            convertMovies,
            convertSeries,
            getVoteByUserAndContent,
            createVote,
            createReview,
            getReviewsByContent,
            getReviewsByUser,
            deleteReview,
            updateFavoriteAlert
        }}>
            {props.children}
        </MoviesContext.Provider>
    )
}

export {MoviesContext, MoviesProviderWrapper}