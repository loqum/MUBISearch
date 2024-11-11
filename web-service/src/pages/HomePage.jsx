import {useState} from "react";
import {Container, Image} from "react-bootstrap";
import logo from "../assets/images/logo.png";
import MoviesCards from "../components/MoviesCards.jsx";

function HomePage() {
    const [selectedMovie, setSelectedMovie] = useState();

    return (
        <>
            <Container>
                <Image src={logo} alt="Logo MUBISearch" fluid rounded className="mb-4 mt-4" />
                <h1>Última películas</h1>
                <MoviesCards selectMovie={setSelectedMovie}/>
            </Container>
        </>
    )
}

export default HomePage;
