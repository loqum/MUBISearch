import {createContext, useState} from "react";

const UserContext = createContext();

function UserProviderWrapper(props) {
    const [user, setUser] = useState({
        username: "",
        fullName: "",
        password: "",
        isLoggedIn: false
    });

    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserProviderWrapper, UserContext};