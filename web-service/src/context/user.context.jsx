import {createContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const UserContext = createContext();

function UserProviderWrapper(props) {

    const navigate = useNavigate();

    const initialUser = JSON.parse(sessionStorage.getItem("user")) || {
        name: "",
        fullName: "",
        password: "",
        isLoggedIn: false
    };

    const [user, setUser] = useState(initialUser);

    const createUser = async (user) => {
        try {
            if (user) {
                const response = await axios({
                    method: 'post',
                    url: 'http://localhost:8080/api/v1/users',
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

    const loginUser = async (user) => {
        try {
            if (user) {
                const response = await axios.post(`http://localhost:8080/api/v1/users/login/`, user);
                console.log("loginUser response:", response);
                return response.data.data;
            }
        } catch (error) {
            console.error("Error login user:", error);
            throw error;
        }
    };

    const logoutUser = () => {
        setUser({name: "", fullName: "", password: "", isLoggedIn: false});
        sessionStorage.removeItem("user");
        navigate("/");
    }

    return (
        <UserContext.Provider value={{user, setUser, loginUser, createUser, logoutUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserProviderWrapper, UserContext};