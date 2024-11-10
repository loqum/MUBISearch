import NavigationBar from "../components/NavigationBar.jsx";

function MainLayout({children}) {
    return (
        <>
            <NavigationBar/>
            <main>{children}</main>
        </>
    );

}

export default MainLayout;
