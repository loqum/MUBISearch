import {useContext, useState} from "react";
import {Container} from "react-bootstrap";
import {UserContext} from "../context/user.context.jsx";

function ProfileDetails() {

    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    );

    const {formatDate} = useContext(UserContext);

    return (

        <Container className={"mt-lg-5"}>
            <h1>Perfil de usuario</h1>
            <h4>Nombre de usuario: {user.name}</h4>
            <h4>Nombre completo: {user.fullName}</h4>
            <h4>Fecha de creación: {formatDate(user.createdAt)}</h4>
            <h4>Contenidos favoritos:</h4>
            {user.favorites && user.favorites.length > 0 ? (
                user.favorites.map((favorite, index) => (
                    <div key={index}>
                        <p>{favorite}</p>
                    </div>
                ))
            ) : (
                <p>*No hay favoritos*</p>
            )}


        </Container>

    );

}

export default ProfileDetails;