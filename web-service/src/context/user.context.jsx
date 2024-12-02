import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

const UserContext = createContext();

function UserProviderWrapper(props) {

    const {user: auth0User, isAuthenticated} = useAuth0();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [syncUser, setSyncUser] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (isAuthenticated && auth0User) {
            fetchUserBySub();
        } else {
            setUser(null);
        }
    }, [isAuthenticated, auth0User, syncUser]);

    useEffect(() => {
        if (user) {
            fetchNotifications(user);
        }
    }, [user]);

    const fetchUserBySub = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/users/sub/${auth0User.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Updated user:", response.data);

            const updatedUser = {
                ...auth0User,
                favorites: response.data.favorites || [],
                id: response.data.id,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt,
                birthdate: response.data.birthdate,
                fullname: response.data.fullname
            };
            console.log("Updated user2:", response.data);

            setUser(updatedUser);

        } catch (error) {
            console.error("Error fetching updated user:", error);
            setError(error);
        }
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('es-ES').format(new Date(date));
    }

    const fetchUserById = async (id) => {
        try {
            if (id) {
                const response = await axios.get(`http://localhost:8080/api/v1/users/id/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    }

    const updateUser = async (user) => {
        try {
            if (user) {
                const response = await axios.put(`http://localhost:8080/api/v1/users/${user.id}`, user, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.data;
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setError(error);
        }
    }

    const fetchNotifications = async (user) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/notifications/user/${user.id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Notifications:", response.data);
            setNotifications(response.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setError(error);
        }
    }

    const triggerUserSync = () => {
        setSyncUser(true);
    };

    return (
        <UserContext.Provider value={{
            user,
            error,
            setError,
            notifications,
            formatDate,
            updateUser,
            triggerUserSync,
            fetchUserBySub,
            fetchUserById
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserProviderWrapper, UserContext};