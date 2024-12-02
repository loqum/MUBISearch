import React, {useContext} from "react";
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
                <Row className="mb-lg-5">
                    <Col>
                        <h4 className={"text mb-lg-3"}>Área personal</h4>
                        <Card>
                            <Card.Body>
                                <Card.Text><strong>Nombre de usuario:</strong> {user.nickname}</Card.Text>
                                <Card.Text><strong>Correo electrónico:</strong> {user.email}</Card.Text>
                                <Card.Text><strong>Fecha de creación:</strong> {formatDate(user.createdAt)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-lg-5">
                    <Col>
                        <Favorites/>
                    </Col>
                </Row>

                <Row className="mb-lg-5">
                    <Col>
                        <h4 className={"text mb-lg-3"}>Críticas realizadas</h4>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <Reviews/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-lg-5">
                    <Col>
                        <h4 className={"text mb-4 mt-4"}>Notificaciones</h4>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <Notifications/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </>
    );

}

export default ProfileDetails;