function Login(props) {

    const user = {
        username: "",
        email: ""
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User");
        props.handleLogin(user);
    }

    const setUserName = (e) => {
        user.username = e.target.value;
    }

    const setEmail = (e) => {
        user.email = e.target.value;
    }

    return (
        <section>
            <h2>Login Section</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor={"username"}>Username</label>
                    <input type={"text"} id={"username"} onChange={setUserName}/>
                </fieldset>
                <fieldset>
                    <label htmlFor={"email"}>Email</label>
                    <input type={"text"} id={"email"} onChange={setEmail}/>
                </fieldset>
                <button>Login</button>
            </form>

        </section>
    );
}

export default Login;
