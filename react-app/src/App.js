import { Text } from "@chakra-ui/layout";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./login/login";
import Test from "./login/test";
import User from "./webpages/user";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
//Custom React folder to handle CSS styles
class App extends React.Component {

  state = {
    session: []
  }

  getSession = (sessionData) => {
    this.setState({session: sessionData})
/*     axios.get('/auth/login')
    .then(response => {
        this.setState({session: response.data});
        console.log(this.state.session);
    })
    .catch(() => {
        alert('User list NOT found');
    }) */


  }

  render() {
    return (
      <div>
         <Routes>
          <Route path='/test' element={<Test />} />
          <Route path='/user' element={<User session={ this.state.session }/>} />
          <Route path="/" element={<Login getSession={ this.getSession }/>} />
{/*           <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Text>You Logged In!</Text>}/>
          </Route>
          <Route path="*" element={<Login />}/> */}
        </Routes>
      </div>
    );
  }
}

export default App;

