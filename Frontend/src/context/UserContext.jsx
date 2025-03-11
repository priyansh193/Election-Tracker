import { createContext, useState, useEffect } from "react"

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = localStorage.getItem("accessToken")
                setIsLoggedIn(!!token)

                const userData = JSON.parse(localStorage.getItem("UserData"))
                setUser(userData)
                
            } catch (error) {
                console.error("Auth check failed:", error)
                // Clear invalid data
                localStorage.removeItem("accessToken")
                localStorage.removeItem("userData")
                setIsLoggedIn(false)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const logout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("UserData")
        setIsLoggedIn(false)
        setUser(null)
    }

    if (loading) {
        return null 
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
    )
}

export { UserContext, UserProvider }