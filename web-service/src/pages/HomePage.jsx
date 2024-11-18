import {Container, Image} from "react-bootstrap";
import logo from "../assets/images/logo.png";
import MoviesCards from "../components/MoviesCards.jsx";

function HomePage() {

    return (
        <>
            <Container>
                <Image src={logo} alt="Logo MUBISearch" fluid rounded className="mb-4 mt-4" />
                <h1>Últimas películas</h1>
                <MoviesCards />
            </Container>
        </>
    )
}

export default HomePage;
