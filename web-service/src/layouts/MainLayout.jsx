import NavigationBar from "../components/NavigationBar.jsx";
import {ArrowUp} from "react-bootstrap-icons";

function MainLayout({children}) {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            <NavigationBar/>
            <main>{children}</main>
            <div
                onClick={scrollToTop}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "50%",
                    padding: "10px",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                }}
                aria-label="Volver al inicio"
            >
                <ArrowUp size={24}/>
            </div>
        </>
    );

}

export default MainLayout;
