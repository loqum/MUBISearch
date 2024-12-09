import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {AuthContext} from "./auth.context.jsx";
import {PersistUser} from "../components/PersistUser.jsx";

const UserContext = createContext();

function UserProviderWrapper(props) {

    const {user: auth0User, isAuthenticated} = useAuth0();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const { getAccessTokenSilently } = useContext(AuthContext);
    const [isPersisting, setIsPersisting] = useState(true);

    useEffect(() => {
        if (isAuthenticated && auth0User) {
            fetchUserBySub();
        } else {
            setUser(null);
        }
    }, [isAuthenticated, auth0User, isPersisting]);

    useEffect(() => {
        if (user) {
            fetchNotifications(user);
        }
    }, [user]);

    const handlePersistComplete = () => {
        setIsPersisting(false);
    };

    const fetchUserBySub = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/users/sub/${auth0User.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const updatedUser = {
                ...auth0User,
                favorites: response.data.favorites || [],
                id: response.data.id,
                role: response.data.role,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt,
                birthdate: response.data.birthdate,
                fullname: response.data.fullname
            };
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
                const token = await getAccessTokenSilently();
                const response = await axios.put(`http://localhost:8080/api/v1/users/update/${user.id}`, user, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
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
            setNotifications(response.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setError(error);
        }
    }

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            error,
            setError,
            notifications,
            formatDate,
            updateUser,
            fetchUserBySub,
            fetchUserById
        }}>
            {props.children}
            <PersistUser onPersistComplete={handlePersistComplete} />
        </UserContext.Provider>
    );
}

export {UserProviderWrapper, UserContext};