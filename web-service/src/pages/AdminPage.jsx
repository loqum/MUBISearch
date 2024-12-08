import AdminDetails from "../components/AdminDetails.jsx";
import {Container} from "react-bootstrap";

function AdminPage() {
    return (
        <Container>
            <h1 className={"text m-5"}>Panel de administrador</h1>
            <AdminDetails/>
        </Container>
    );
}

export default AdminPage;
