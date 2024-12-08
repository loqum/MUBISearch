import {Button, Card, Modal} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/auth.context.jsx";
import {Delete} from "@mui/icons-material";
import {Fab} from "@mui/material";
import {UserContext} from "../context/user.context.jsx";

function AdminDetails() {

    const {fetchUsers, deleteUserById, updateUserEmail, updateUserPassword} = useContext(AuthContext);
    const {updateUser} = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateField, setUpdateField] = useState(null);
    const [updateValue, setUpdateValue] = useState("");
    const [currentUser, setCurrentUser] = useState(null);


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

    function handleUpdateEmailClick(user) {
        setUpdateField("email");
        setCurrentUser(user);
        setShowUpdateModal(true);
    }

    function handleUpdatePasswordClick(user) {
        setUpdateField("password");
        setCurrentUser(user);
        setShowUpdateModal(true);
    }

    function handleDeleteClick(user) {
        setSelectedUser(user);
        setShowModal(true);
    }

    const confirmUpdate = async () => {
        try {
            if (updateField === "email") {
                await updateUserEmail(currentUser.user_id, updateValue);
                const user = {
                    "email": updateValue,
                }
                await updateUser(user);
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.user_id === currentUser.user_id
                            ? { ...user, email: updateValue }
                            : user
                    )
                );
            } else if (updateField === "password") {
                await updateUserPassword(currentUser.user_id, updateValue);
            }
            setShowUpdateModal(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };


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
                    <Card.Body>
                        <Card.Img variant="top" src={user.picture} style={{width: '100px'}} className="mb-4"/>
                        <Card.Text><strong>Usuario:</strong> {user.username}</Card.Text>
                        <Card.Text><strong>ID:</strong> {user.user_id}</Card.Text>
                        <Card.Text><strong>Correo electrónico:</strong> {user.email}</Card.Text>
                        <Card.Text><strong>IP:</strong> {user.last_ip}</Card.Text>
                        <Card.Text><strong>Último login:</strong> {formatDate(user.last_login)}</Card.Text>
                        <Card.Text><strong>Última actualización del perfil:</strong> {formatDate(user.updated_at)}
                        </Card.Text>
                        <div className="d-flex justify-content-end">
                            <Fab color="primary" className="m-3" aria-label="add" variant="extended"
                                 onClick={() => handleUpdatePasswordClick(user)}>
                                Cambiar contraseña
                            </Fab>
                            <Fab color="primary" className="m-3" variant="extended"  aria-label="add" onClick={() => handleUpdateEmailClick(user)}>
                                Cambiar email
                            </Fab>
                            {user.roles[0].name === "USER" && (
                                <Fab color="error" className="m-3"  aria-label="add" onClick={() => handleDeleteClick(user)}>
                                    <Delete/>
                                </Fab>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            ))}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>¡Atención!</Modal.Title>
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

            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {updateField === "email" ? "Actualizar correo electrónico" : "Actualizar contraseña"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={updateField === "email" ? "Nuevo correo electrónico" : "Nueva contraseña"}
                        value={updateValue}
                        onChange={(e) => setUpdateValue(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmUpdate}>
                        Actualizar
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    );
}

export default AdminDetails;