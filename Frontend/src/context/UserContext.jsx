import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = localStorage.getItem("accessToken");
                const userData = localStorage.getItem("UserData");
                setIsLoggedIn(!!token);

                if (userData) {
                    const parsedUserData = JSON.parse(userData);
                    if (parsedUserData && parsedUserData._id) {
                        setUser(parsedUserData);
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("UserData");
                setIsLoggedIn(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("UserData");
        setIsLoggedIn(false);
        setUser(null);
    };

    if (loading) {
        return null;
    }

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
