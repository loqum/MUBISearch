import React, {useContext, useState} from "react";
import {Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {UserContext} from "../context/user.context.jsx";
import {Notifications} from "./Notifications.jsx";
import {Reviews} from "./Reviews.jsx";
import {Favorites} from "./Favorites.jsx";
import {Fab, IconButton, TextField} from "@mui/material";
import {Edit, SaveRounded} from "@mui/icons-material";

function ProfileDetails() {

    const {user, setUser, formatDate, updateUser} = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    const [fullname, setFullname] = useState(user?.fullname || "");

    if (!user) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        );
    }

    const handleSaveFullname = async () => {
        try {
            const updatedUser = {...user, fullname};
            setEditing(false);
            updateUser(updatedUser);
            setUser(updatedUser);
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    }

    return (
        <>
            <Container className="mt-5">
                <Row className="mb-lg-5">
                    <Col>
                        <h4 className={"text mb-lg-3"}>Área personal</h4>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-end">
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => setEditing(!editing)}
                                    >
                                        <Edit/>
                                    </IconButton>
                                </div>
                                <Card.Text className="mb-3"><strong>Nick:</strong> {user.nickname}</Card.Text>
                                {editing ? (
                                    <Form>
                                        <Form.Group as={Row} controlId="fullname" className="align-items-center">
                                            <Form.Label column sm="2" className="text-right">
                                                <strong>Nombre completo:</strong>
                                            </Form.Label>
                                            <Col sm="3">
                                                <TextField id="standard-basic"
                                                           label="Introduce tu nombre completo"
                                                           className="form-control mb-4"
                                                           fullWidth
                                                           variant="standard"
                                                           value={fullname ? fullname : user.fullname}
                                                           onChange={(e) => setFullname(e.target.value)}/>
                                            </Col>
                                        </Form.Group>
                                    </Form>

                                ) : (
                                    <Card.Text className="mb-3">
                                        <strong>Nombre completo:</strong> {user.fullname}
                                    </Card.Text>
                                )}
                                <Card.Text className="mb-3"><strong>Correo electrónico:</strong> {user.email}
                                </Card.Text>
                                <Card.Text className="mb-3"><strong>Fecha de
                                    creación:</strong> {formatDate(user.createdAt)}</Card.Text>

                                {editing && fullname.trim() && (
                                    <div className="d-flex justify-content-end mt-3">

                                        <IconButton
                                            variant="primary"
                                            onClick={handleSaveFullname}
                                        >
                                            <Fab color="primary" aria-label="save">
                                                <SaveRounded/>
                                            </Fab>
                                        </IconButton>
                                    </div>
                                )}

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