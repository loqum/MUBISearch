import React, {useContext, useEffect} from "react";
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {UserContext} from "../context/user.context.jsx";
import {Notifications} from "./Notifications.jsx";
import {Reviews} from "./Reviews.jsx";
import {Favorites} from "./Favorites.jsx";

function ProfileDetails() {

    const {user, formatDate} = useContext(UserContext);

    if (!user) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        );
    }

    return (
        <>
            <Container className="mt-5">
                <Row className="mb-4">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Perfil de usuario</Card.Title>
                                <Card.Text><strong>Nombre de usuario:</strong> {user.nickname}</Card.Text>
                                <Card.Text><strong>Correo electrónico:</strong> {user.email}</Card.Text>
                                <Card.Text><strong>Fecha de creación:</strong> {formatDate(user.createdAt)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Favorites/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Reviews/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Notifications/>
                    </Col>
                </Row>

            </Container>
        </>
    );

}

export default ProfileDetails;