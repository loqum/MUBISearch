import {useState} from "react";
import MovieDetails from "../components/MovieDetails.jsx";
import MovieList from "../components/MovieList.jsx";
import {Container, Image} from "react-bootstrap";
import logo from "../assets/images/logo.png";

function HomePage() {
    const [selectedMovie, setSelectedMovie] = useState();

    return (
        <>
            <Container>
                <Image src={logo} alt="Logo MUBISearch" fluid rounded className="mb-4 mt-4" />
                {selectedMovie && (
                    <div>
                        <h2>Película seleccionada</h2>
                        <MovieDetails movie={selectedMovie}/>
                    </div>
                )}

                <MovieList selectMovie={setSelectedMovie}/>
            </Container>
        </>
    )
}

export default HomePage;
