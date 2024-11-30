import {Button, Col, Container, Form, Image, Navbar, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {UserContext} from "../context/user.context.jsx";
import {MoviesContext} from "../context/movies.context.jsx";
import {LoginButton} from "./LoginButton.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {LogoutButton} from "./LogoutButton.jsx";

function NavigationBar() {

    const [movies, setMovies] = useState([]);
    const navigateToList = useNavigate();

    // const {user, logoutUser} = useContext(UserContext);
    const {fetchMovies, convertMovies} = useContext(MoviesContext);
    const {isAuthenticated, isLoading, user} = useAuth0();

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        const query = event.target[0].value;

        try {
            let response = await fetchMovies(query);
            response = response.filter((movie) => movie.poster_path !== null);
            console.log("Response:", response);
            const transformedContents = convertMovies(response);
            setMovies(transformedContents);
            event.target[0].value = "";
            navigateToList(`/contents`, {state: {transformedContents, isMovie: true, isSeries: false}});
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
                <div className="d-flex justify-content-center align-items-center flex-grow-1">

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
                </div>

                {isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                ) : (
                    isAuthenticated ? (
                        <Navbar.Text className="ms-auto">
                            <Link to="/profile" className="me-3">
                                <Image
                                    src={user.picture}
                                    alt="Foto de perfil"
                                    roundedCircle
                                    width="40"
                                    height="40"
                                />
                            </Link>
                            <LogoutButton/>
                        </Navbar.Text>
                    ) : (
                        <LoginButton/>
                    )
                )}
            </Container>
        </Navbar>
    );

}

export default NavigationBar;