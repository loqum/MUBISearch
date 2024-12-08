import {Button, Card, Modal} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/auth.context.jsx";

function AdminDetails() {

    const {fetchUsers, deleteUserById} = useContext(AuthContext);
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
        try {
            await deleteUserById(selectedUser.user_id);
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.user_id !== selectedUser.user_id)
            );
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
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

                    {user.roles[0].name === "USER" && (
                        <i
                            className="bi bi-trash-fill text-danger position-absolute"
                            style={{
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                            }}
                            onClick={() => handleDeleteClick(user)}

                        />
                    )}

                    <Card.Body>
                        <Card.Img variant="top" src={user.picture} style={{width: '100px'}} className="mb-4"/>
                        <Card.Text><strong>Usuario:</strong> {user.username}</Card.Text>
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