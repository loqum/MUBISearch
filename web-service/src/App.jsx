import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import {Auth0Provider} from "@auth0/auth0-react";
import React, {Suspense} from "react";
import {Spinner} from "react-bootstrap";
import MoviesPage from "./pages/MoviesPage.jsx";
import DetailMoviePage from "./pages/DetailMoviePage.jsx";

const domain = "uoc-mubisearch.us.auth0.com";
const clientId = "WNaBebgkDqJiWoXHc5lZSRE6GkqDFiSF";
const audience = "https://uoc-mubisearch.us.auth0.com/api/v2/";

function App() {
    return (

        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: audience,
                scope: "openid profile email",
            }}
        >
            <Suspense
                fallback={
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh"
                    }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                }
            >
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/movies" element={<MoviesPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/search" element={<SearchPage/>}/>
                        <Route path="/details/:idMovie" element={<DetailMoviePage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/error" element={<ErrorPage/>}/>
                        <Route path="*" element={<ErrorPage/>}/>
                    </Routes>
                </MainLayout>
            </Suspense>
        </Auth0Provider>
    );

}

export default App
