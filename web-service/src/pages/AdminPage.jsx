import AdminDetails from "../components/AdminDetails.jsx";
import {Container} from "react-bootstrap";

function AdminPage() {
    return (
        <Container>
            <h1>Admin</h1>
            <AdminDetails/>
        </Container>
    );
}

export default AdminPage;
