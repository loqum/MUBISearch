import {createContext, useState} from "react";
import axios from "axios";

const UserContext = createContext();

function UserProviderWrapper(props) {
    const [user, setUser] = useState({
        name: "",
        fullName: "",
        password: "",
        isLoggedIn: false
    });

    const createUser = async (user) => {
        try {
            if (user) {
                const response = axios({
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
            console.error("Error creating user:", error);
            throw error;
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

    return (
        <UserContext.Provider value={{user, setUser, loginUser, createUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserProviderWrapper, UserContext};