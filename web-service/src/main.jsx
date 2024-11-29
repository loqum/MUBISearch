import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './assets/css/bootstrap.min.css'
import {MoviesProviderWrapper} from "./context/movies.context.jsx";
import {BrowserRouter} from "react-router-dom";
import {UserProviderWrapper} from "./context/user.context.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
    }}>
        <UserProviderWrapper>
            <MoviesProviderWrapper>
                <App/>
            </MoviesProviderWrapper>
        </UserProviderWrapper>
    </BrowserRouter>
)
