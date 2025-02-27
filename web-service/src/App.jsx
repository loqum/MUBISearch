import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ContentPage from "./pages/ContentPage.jsx";
import DetailMoviePage from "./pages/DetailMoviePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/contents" element={<ContentPage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/details/:idContent" element={<DetailMoviePage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </MainLayout>
    );

}

export default App
