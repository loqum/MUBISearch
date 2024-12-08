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

    const deleteUserById = async (id) => {
        if (id) {
            const token = await getAccessTokenSilently();
            await axios.delete(`http://localhost:8080/api/v1/users/auth0/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

    }

    const updateUserById = async (user) => {
        if (!user) {
            const token = await getAccessTokenSilently();
            await axios.patch(`http://localhost:8080/api/v1/users/auth0/update/${user.id}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
    }

    const updateUserEmail = async (idUser, newEmail) => {
        try {
            if (idUser && newEmail) {
                const token = await getAccessTokenSilently();
                await axios.patch(
                    `http://localhost:8080/api/v1/users/auth0/update/${idUser}`,
                    {email: newEmail},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
            }
        } catch (error) {
            console.error("Error updating user email:", error);
        }
    };

    const updateUserPassword = async (idUser, newPassword) => {
        try {
            if (idUser && newPassword) {
                const token = await getAccessTokenSilently();
                await axios.patch(
                    `http://localhost:8080/api/v1/users/auth0/update/${idUser}`,
                    {password: newPassword},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

            }
        } catch (error) {
            console.error("Error updating user password:", error);
        }
    };

    const getUserById = async (id) => {
        const token = await getAccessTokenSilently();
        const response = await axios(`http://localhost:8080/api/v1/users/auth0/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return await response.data;
    }

    return (
        <AuthContext.Provider
            value={{
                getAccessTokenSilently,
                loginWithRedirect,
                logout,
                user,
                isAuthenticated,
                fetchUsers,
                getUserById,
                updateUserById,
                updateUserEmail,
                updateUserPassword,
                deleteUserById
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProviderWrapper};
