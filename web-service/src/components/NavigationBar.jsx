import {Button, Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import FetchMovies from "../services/FetchMovies.jsx";
import {UserContext} from "../context/user.context.jsx";

function NavigationBar() {

    const [movies, setMovies] = useState([]);
    const navigateToList = useNavigate();

    const {user, setUser} = useContext(UserContext);

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
        <Navbar className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand href="/">MUBISearch</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>

            <Form className="d-flex ms-auto me-3" onSubmit={handleSearchSubmit}>
                <Row>
                    <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Buscar película..."
                            className=" mr-sm-2"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button as={Link} to="/search">Búsqueda avanzada</Button>
                    </Col>
                </Row>
            </Form>

            {!user.isLoggedIn ? (
                <>
                    <Button className="me-auto" variant="outline-primary" as={Link} to="/login">Iniciar sesión</Button>
                </>
            ) : (
                <>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Ha iniciado sesión como: <a href="/me">{user.username}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </>
            )}
        </Navbar>
    );

}

export default NavigationBar;