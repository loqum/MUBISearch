import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import axios from "axios";

export const PersistUser = ({onPersistComplete}) => {
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [isPersisting, setIsPersisting] = useState(false);

    useEffect(() => {
        const persistUser = async () => {
            if (isAuthenticated) {
                setIsPersisting(true);
                const token = await getAccessTokenSilently();
                let rolesAvailable = false;
                let retries = 3;

                while (!rolesAvailable && retries > 0) {
                    const roles = user['mubisearch_roles'];
                    if (roles && roles.length > 0) {
                        rolesAvailable = true;
                    } else {
                        retries--;
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                    }
                }

                if (!rolesAvailable) {
                    setIsPersisting(false);
                    return;
                }

                const response = await axios.get(
                    `http://localhost:8080/api/v1/users/exists/${user.sub}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.data) {
                    await axios({
                        method: "post",
                        url: "http://localhost:8080/api/v1/users/create",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            role: user.mubisearch_roles[0],
                            sub: user.sub,
                            name: user.nickname,
                            email: user.email,
                        },

                    });
                }

                setIsPersisting(false);
                if (onPersistComplete) onPersistComplete();


            }
        }
        persistUser();

    }, [isAuthenticated, user, getAccessTokenSilently, onPersistComplete]);

    return null;
}