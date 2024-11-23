import {Container, Image} from "react-bootstrap";
import logo from "../assets/images/logo.png";
import MoviesCards from "../components/MoviesCards.jsx";
import {ArrowUp} from "react-bootstrap-icons";

function HomePage() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <Container>
                <Image src={logo} alt="Logo MUBISearch" fluid rounded className="mb-4 mt-4"/>
                <h1>Últimas películas</h1>
                <MoviesCards/>
                <div
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        borderRadius: "50%",
                        padding: "10px",
                        cursor: "pointer",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                    }}
                    aria-label="Volver al inicio"
                >
                    <ArrowUp size={24}/>
                </div>
            </Container>
        </>
    )
}

export default HomePage;
