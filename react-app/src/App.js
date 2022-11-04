import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import axios from "../src/apis/coreApp";
import SearchView from "./components/SearchView";
import Header from "./components/Header";
import Profile from "./components/Profile";
import HomeFeed from "./components/HomeFeed";
import { Navigate } from "react-router-dom";

const App = () => {
	const [session, setSession] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		requireAuth()
	})

	const signOut = () => {
		setSession(null)
		setIsAuthenticated(false)
	}

	const setSessionAndAuth = (data) => {
		setSession(data)
		setIsAuthenticated(true)
	}

	const requireAuth = async () => {
		if (session === null) {
			setIsAuthenticated(false)
		} else {
			const auth = await axios.get('/auth/login/', {
				withCredentials: true
			})
			setIsAuthenticated(auth.data.loggedIn)
		}
	}

	return (
		<div>
			{ session && isAuthenticated && <Header session={ session } signOut={ signOut } />}
			<Routes>
				<Route path='/' 
					element={<Login setSession={ setSessionAndAuth } />} 
				/>
				<Route path='/home' 
					element={ isAuthenticated ? <HomeFeed session={ session } /> : <Navigate to="/" /> } 
				/> 
				<Route path='/search' 
					element={ isAuthenticated ? <SearchView session={ session } /> : <Navigate to="/" /> } 
				/>
				<Route path='/profile/:id' 
					element={ isAuthenticated ? <Profile session={ session } /> : <Navigate to="/" /> } 
				/>
			</Routes>
		</div>
	);
}

export default App;

