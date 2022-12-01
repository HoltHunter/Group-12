import { Route, Routes, Navigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Login from "./components/Login"
import axios from "./apis/coreApp"
import SearchView from "./components/SearchView"
import Header from "./components/Header"
import Profile from "./components/Profile"
import HomeFeed from "./components/HomeFeed"
import Settings from "./components/Settings"

function App() {
    const [session, setSession] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [theme, setTheme] = useState(null)

    useEffect(() => {
        requireAuth()
    })

    const signOut = () => {
        setSession(null)
        setIsAuthenticated(false)
    }
    const setSessionAndAuth = (data) => {
        setTheme(data.theme)
        setSession(data)
        setIsAuthenticated(true)
    }

    const requireAuth = async () => {
        if (session === null) {
            setIsAuthenticated(false)
        } else {
            const auth = await axios.get("/auth/login/", {
                withCredentials: true,
            })
            setIsAuthenticated(auth.data.loggedIn)
        }
    }

    return (
        <div>

            { session && isAuthenticated && <Header session={session} signOut={signOut} />}
            <link rel="stylesheet" href={session ? `${theme}.css` : ""} />
            <Routes>
                <Route
                    path="/"
                    element={<Login setSession={setSessionAndAuth} />}
                />
                <Route
                    path="/home"
                    element={isAuthenticated ? <HomeFeed session={session} /> : <Navigate to="/" />}
                />
                <Route
                    path="/search"
                    element={isAuthenticated ? <SearchView session={session} /> : <Navigate to="/" />}
                />
                <Route
                    path="/profile/:id"
                    element={isAuthenticated ? <Profile session={session} /> : <Navigate to="/" />}
                />
                <Route
                    path="/settings"
                    element={isAuthenticated ? <Settings session={session} setSession={setSessionAndAuth} /> : <Navigate to="/" />}
                />
            </Routes>
        </div>
    )
}

export default App
