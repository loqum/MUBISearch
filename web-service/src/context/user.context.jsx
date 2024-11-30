import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

const UserContext = createContext();

function UserProviderWrapper(props) {

    const {user: auth0User, isAuthenticated} = useAuth0();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [syncUser, setSyncUser] = useState(false);

    useEffect(() => {
        if (isAuthenticated && auth0User) {
            fetchUserBySub();
        } else {
            setUser(null);
        }
    }, [isAuthenticated, auth0User, syncUser]);


    const fetchUserBySub = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/users/sub/${auth0User.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Updated user:", response.data);

            const updatedUser = {
                ...auth0User, favorites: response.data.favorites || [], id: response.data.id, createdAt: response.data.createdAt,
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

    const triggerUserSync = () => {
        setSyncUser(true);
    };

    return (
        <UserContext.Provider value={{
            user,
            error,
            setError,
            formatDate,
            triggerUserSync,
            fetchUserBySub,
            fetchUserById
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserProviderWrapper, UserContext};