import {useAuth0} from "@auth0/auth0-react";

export const ProtectedRoutes = ({children}) => {
    const {isAuthenticated} = useAuth0();
    return isAuthenticated ? children : "Necesitas estar logueado para ver esta página";
}