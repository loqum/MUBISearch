import React, {createContext} from "react";
import {useAuth0} from "@auth0/auth0-react";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
    const { getAccessTokenSilently, loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    return (
        <AuthContext.Provider value={{ getAccessTokenSilently, loginWithRedirect, logout, user, isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProviderWrapper};
