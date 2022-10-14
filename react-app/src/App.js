// import { Text } from "@chakra-ui/layout";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import User from "./components/User";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
//Custom React folder to handle CSS styles
class App extends React.Component {

  	state = {
		session: null
  	}

  	setSession = (session) => {
		console.log("Session data: ", session)
		this.setState({ session: session })
  	}

//   getSession = (sessionData) => {
//     this.setState({ session: sessionData })
/*     axios.get('/auth/login')
    .then(response => {
        this.setState({session: response.data});
        console.log(this.state.session);
    })
    .catch(() => {
        alert('User list NOT found');
    }) */
//   }

  	render() {
    	return (
      		<div>
         		<Routes>
          			<Route path='/user' 
						element={<User 
							session={ this.state.session }
						/>} 
					/>
          			<Route path='/' 
						element={<Login 
							setSession={ this.setSession } 
							/>} 
					/>
        		</Routes>
      		</div>
    	);
  	}
}

export default App;

