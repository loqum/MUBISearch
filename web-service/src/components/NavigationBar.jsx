import {Button, Col, Container, Form, Navbar, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {LoginButton} from "./LoginButton.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {LogoutButton} from "./LogoutButton.jsx";
import {Avatar, Badge, Fab} from "@mui/material";
import {UserContext} from "../context/user.context.jsx";

function NavigationBar() {

    const navigateToList = useNavigate();
    const {fetchMovies, convertMovies} = useContext(MoviesContext);
    const {notifications} = useContext(UserContext);
    const {isAuthenticated, isLoading, user} = useAuth0();

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        const query = event.target[0].value;
        try {
            let response = await fetchMovies(query);
            response = response.filter((movie) => movie.poster_path !== null);
            const transformedContents = convertMovies(response);
            event.target[0].value = "";
            navigateToList(`/contents`, {state: {transformedContents, isMovie: true, isSeries: false}});
        } catch (e) {
            console.error("Error fetching movies:", e);
        }

    }

    const handleLinkProfile = () => {
        if (user?.mubisearch_roles[0] === "ADMIN") {
            return "/admin";
        } else {
            return "/profile";
        }
    }

    const profileLink = handleLinkProfile();

    return (
        <Navbar bg="light" expand="lg" className="px-4">
            <Container fluid>
                <Navbar.Brand href="/" className="me-auto">
                    <Fab variant="extended" color="primary">
                        MUBISearch
                    </Fab>
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
                            <Link to={profileLink} className="me-3">
                                <Fab aria-label="profile">
                                    <Badge badgeContent={notifications.length} color="primary">
                                        <Avatar src={user.picture} alt="Foto de perfil"/>
                                    </Badge>
                                </Fab>
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