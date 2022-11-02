import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; //Custom React folder to handle CSS styles
import SearchView from "./components/SearchView";
import Header from "./components/Header";
import Profile from "./components/Profile";
import HomeFeed from "./components/HomeFeed";

class App extends React.Component {
  	state = {
		session: null
  	}

  	setSession = (session) => {
		console.log("Session data: ", session)
		this.setState({ session: session })
  	}

  	render() {
    	return (
      		<div>
				{ this.state.session && <Header />}
         		<Routes>
				 	<Route path='/' 
						element={<Login setSession={ this.setSession } />} 
					/>
          			<Route path='/home' 
						element={<HomeFeed session={ this.state.session } />} 
					/>
					<Route path='/search' 
						element={<SearchView session={ this.state.session } />} 
					/>
					<Route path='/profile/:id' 
						element={<Profile session={ this.state.session } />} 
					/>
        		</Routes>
      		</div>
    	);
  	}
}

export default App;

