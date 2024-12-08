import {Button, Card, Container, Modal} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/auth.context.jsx";
import {Link} from "react-router-dom";

function AdminDetails() {

    const {fetchUsers} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getUsers = async () => {
        const response = await fetchUsers();
        setUsers(response);
        console.log("Users:", response);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };

        return new Intl.DateTimeFormat('es-ES', options).format(date);
    }

    useEffect(() => {
        getUsers();
    }, []);

    if (!users) {
        return (
            <p>Cargando usuarios...</p>
        )
    }

    function handleUpdateClick(user) {
        
    }

    function handleDeleteClick(user) {
        setSelectedUser(user);
        setShowModal(true);
    }

    const confirmDelete = async () => {
    };

    return (
        <>
            {users.map((user) => (
                <Card key={user.user_id} className="mb-4">
                    <i
                        className="bi bi-pencil-fill text-primary position-absolute"
                        style={{
                            top: "10px",
                            right: "50px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleUpdateClick(user)}
                    />
                    <i
                        className="bi bi-trash-fill text-danger position-absolute"
                        style={{
                            top: "10px",
                            right: "10px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleDeleteClick(user)}

                    />
                    <Card.Body>
                    <Card.Img variant="top" src={user.picture} style={{width: '100px'}}/>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text><strong>Nick:</strong> {user.nickname}</Card.Text>
                        <Card.Text><strong>ID:</strong> {user.user_id}</Card.Text>
                        <Card.Text><strong>Correo electrónico:</strong> {user.email}</Card.Text>
                        <Card.Text><strong>IP:</strong> {user.last_ip}</Card.Text>
                        <Card.Text><strong>Último login:</strong> {formatDate(user.last_login)}</Card.Text>
                        <Card.Text><strong>Última actualización del perfil:</strong> {formatDate(user.updated_at)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar este usuario?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default AdminDetails;