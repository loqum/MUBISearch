import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './assets/css/bootstrap.min.css'
import {MoviesProviderWrapper} from "./context/movies.context.jsx";
import {BrowserRouter} from "react-router-dom";
import {UserProviderWrapper} from "./context/user.context.jsx";
import {Auth0Provider} from "@auth0/auth0-react";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AuthProviderWrapper} from "./context/authProviderWrapper.jsx";


createRoot(document.getElementById('root')).render(
    <Auth0Provider
        domain="mubisearch.eu.auth0.com"
        clientId="xXO0FIGKsBn2pRATa3dMXMfPluE75hs4"
        authorizationParams={{
            redirect_uri: window.location.origin,
            audience: "https://api-mubisearch.local.com",
            scope: "openid profile email",
        }}
    >
        <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
        }}>
            <AuthProviderWrapper>
                <UserProviderWrapper>
                    <MoviesProviderWrapper>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <App/>
                        </LocalizationProvider>
                    </MoviesProviderWrapper>
                </UserProviderWrapper>
            </AuthProviderWrapper>
        </BrowserRouter>
    </Auth0Provider>
)
