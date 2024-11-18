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
                    method: 'post',
                    url: 'http://localhost:8080/api/v1/favorites',
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

    const createMovie = async (movie) => {
        try {
            if (movie) {
                const response = await axios({
                    method: 'post',
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

    return (
        <MoviesContext.Provider value={{movies, setMovies, urlImage, setUrlImage, createFavorite, createMovie, formatDateISO8601, convertDateToDayMonthYear}}>
            {props.children}
        </MoviesContext.Provider>
    )
}

export {MoviesContext, MoviesProviderWrapper}