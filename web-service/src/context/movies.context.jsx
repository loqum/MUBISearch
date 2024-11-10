import {createContext, useState} from 'react';

const MoviesContext = createContext();

function MoviesProviderWrapper(props) {

    const [movies, setMovies] = useState([]);
    const [urlImage, setUrlImage] = useState('https://image.tmdb.org/t/p/original');

    return (
        <MoviesContext.Provider value={{movies, setMovies, urlImage, setUrlImage}}>
            {props.children}
        </MoviesContext.Provider>
    )
}

export {MoviesContext, MoviesProviderWrapper}