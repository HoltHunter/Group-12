import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './home';
import User from './user';
const Webpages = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element = {<Home />} />
                <Route path = "/user" element = {<User />} />
            </Routes>
        </Router>
    );
};

export default Webpages;