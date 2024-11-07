import './App.css'
import MovieList from "./components/MovieList.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import {useState} from "react";
import Jumbotron from "react-bootstrap/Container";
import NavigationBar from "./components/NavigationBar.jsx";

function App() {

    const [selectedMovie, setSelectedMovie] = useState();

    return (
        <>
            <NavigationBar/>
            <Jumbotron>
                {selectedMovie && (
                    <div>
                        <h2>Película seleccionada</h2>
                        <MovieDetails movie={selectedMovie}/>
                    </div>
                )}
                <h2>Lista de películas</h2>
                <MovieList selectMovie={setSelectedMovie}/>
            </Jumbotron>
        </>
    )
}

export default App
