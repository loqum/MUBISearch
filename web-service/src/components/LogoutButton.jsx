import {useAuth0} from "@auth0/auth0-react";
import {Button} from "react-bootstrap";
import {LogoutTwoTone} from "@mui/icons-material";
import {Fab} from "@mui/material";

export const LogoutButton = () => {

    const {logout} = useAuth0();

    return (
        <Fab color="secondary" aria-label="profile">
            <LogoutTwoTone onClick={() => logout({returnTo: window.location.origin})}> Logout </LogoutTwoTone>
        </Fab>
    )
}