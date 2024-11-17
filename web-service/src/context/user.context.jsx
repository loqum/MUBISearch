import {createContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const UserContext = createContext();

function UserProviderWrapper(props) {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('es-ES').format(new Date(date));
    }

    const initialUser = JSON.parse(sessionStorage.getItem("user")) || {
        name: "",
        fullName: "",
        password: "",
        userRole: "",
        favorites: [],
        createdAt: "",
        isLoggedIn: false
    };

    const [user, setUser] = useState(initialUser);

    const createUser = async (user) => {
        try {
            if (user) {
                const response = await axios({
                    method: 'post',
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

    const login = async (user) => {
        try {
            if (user) {
                const response = await axios( {
                    method: 'post',
                    url: 'http://localhost:8080/api/v1/users/login',
                    data: user,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("loginUser response:", response);
                return response.data;
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
        navigate("/");
    }

    return (
        <UserContext.Provider value={{user, setUser, login, createUser, logoutUser, error, setError, formatDate}}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserProviderWrapper, UserContext};