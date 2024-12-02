import {useAuth0} from "@auth0/auth0-react";
import {LoginTwoTone} from "@mui/icons-material";
import {Fab} from "@mui/material";

export const LoginButton = () => {

    const {loginWithRedirect} = useAuth0();

    return (
        <Fab color="primary" aria-label="logout">
            <LoginTwoTone onClick={() => loginWithRedirect()}/>
        </Fab>
    )
}