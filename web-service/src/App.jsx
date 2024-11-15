import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MoviesPage from "./pages/MoviesPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import MovieDetailsPage from "./pages/DetailMoviePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/movies" element={<MoviesPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/details/:externalId" element={<MovieDetailsPage/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </MainLayout>
    );

}

export default App
