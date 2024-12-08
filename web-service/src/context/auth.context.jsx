import React, {createContext} from "react";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
    const {getAccessTokenSilently, loginWithRedirect, logout, user, isAuthenticated} = useAuth0();

    const fetchUsers = async () => {
        const token = await getAccessTokenSilently();
        const response = await axios("http://localhost:8080/api/v1/users/auth0", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return await response.data;
    }

    return (
        <AuthContext.Provider
            value={{getAccessTokenSilently, loginWithRedirect, logout, user, isAuthenticated, fetchUsers}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProviderWrapper};
