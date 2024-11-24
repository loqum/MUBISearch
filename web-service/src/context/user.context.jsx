import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const UserContext = createContext();

function UserProviderWrapper(props) {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [syncUser, setSyncUser] = useState(false);


    const initialUser = JSON.parse(sessionStorage.getItem("user")) || {
        name: "",
        fullName: "",
        password: "",
        userRole: "",
        favorites: [],
        createdAt: "",
        isLoggedIn: false,
        syncUser: false
    };

    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : initialUser;
    });

    useEffect(() => {
        console.log("Sync user:", syncUser);
        fetchUpdatedUser();
    }, [syncUser, user.id]);

    const fetchUpdatedUser = async () => {
        try {
            console.log("NOT Fetching updated user because syncuser {} and user.id {}...", user, user.id);
            if (user.syncUser && user.id) {
                console.log("Fetching updated user...");
                const response = await axios.get(`http://localhost:8080/api/v1/users/id/${user.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const updatedUser = { ...response.data, isLoggedIn: true, syncUser: true};
                console.log("Updated user:", updatedUser);

                if (JSON.stringify(user) !== JSON.stringify(updatedUser)) {
                    setUser(updatedUser);
                }
            }
        } catch (error) {
            console.error("Error fetching updated user:", error);
        }
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('es-ES').format(new Date(date));
    }

    const createUser = async (user) => {
        try {
            if (user) {
                const response = await axios({
                    method: 'POST',
                    url: 'http://localhost:8080/api/v1/users/register',
                    data: user,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log("createUser response:", response);
                return response.data;
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.error("User name already exists:", error);
                throw error;
            } else {
                console.error("Error creating user:", error);
                throw error;
            }
        }
    };

    const login = async (u) => {
        try {
            if (u) {
                const response = await axios( {
                    method: 'POST',
                    url: 'http://localhost:8080/api/v1/users/login',
                    data: u,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const loggedInUser = { ...response.data, isLoggedIn: true, syncUser: true };
                setUser(loggedInUser);
                setSyncUser(true);
                return loggedInUser;
            }
        } catch (error) {
            console.error("Error login user:", error);
            throw error;
        }
    };

    const logoutUser = () => {
        setUser({
            id: null,
            name: "",
            fullName: "",
            password: "",
            userRole: "",
            favorites: [],
            isLoggedIn: false,
        });
        sessionStorage.removeItem("user");
        setSyncUser(false);
        navigate("/");
    }

    const triggerUserSync = () => {
        setSyncUser(true);
    };


    return (
        <UserContext.Provider value={{user, setUser, login, createUser, logoutUser, error, setError, formatDate, triggerUserSync, fetchUpdatedUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserProviderWrapper, UserContext};