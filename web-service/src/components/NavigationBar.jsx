import {Button, Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import FetchMovies from "../services/FetchMovies.jsx";
import {UserContext} from "../context/user.context.jsx";

function NavigationBar() {

    const [movies, setMovies] = useState([]);
    const navigateToList = useNavigate();

    const {user, setUser, logoutUser} = useContext(UserContext);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        const query = event.target[0].value;

        try {
            let response = await FetchMovies(query);
            response = response.filter((movie) => movie.poster_path !== null);
            console.log("Response:", response);
            setMovies(response);
            console.log("Movies:", movies);
            navigateToList(`/movies`, {state: {response}});
        } catch (e) {
            console.error("Error fetching movies:", e);
        }

        if (query) {
            console.log(query);
        }

    }
    return (
        <Navbar bg="light" expand="lg" className="px-4">
            <Container fluid>
                <Navbar.Brand href="/" className="me-auto">
                    MUBISearch
                </Navbar.Brand>

                <Form className="" onSubmit={handleSearchSubmit}>
                    <Row>
                        <Col xs={6}>
                            <Form.Control
                                type="text"
                                placeholder="Buscar película..."
                                className="me-2"
                            />
                        </Col>
                        <Col>
                            <Button variant="outline-secondary" as={Link} to="/search">
                                Búsqueda avanzada
                            </Button>
                        </Col>
                    </Row>
                </Form>


                {!user.isLoggedIn ? (
                    <Button variant="outline-primary" as={Link} to="/login">
                        Iniciar sesión
                    </Button>
                ) : (
                    <Navbar.Text className="ms-auto">
                        <a href="/me">{user.name}</a> /<Button variant="link" onClick={logoutUser}>Cerrar
                        Sesión</Button>
                    </Navbar.Text>
                )}
            </Container>
        </Navbar>
    );

}

export default NavigationBar;