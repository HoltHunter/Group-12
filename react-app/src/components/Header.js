import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/home" className="item">
                Home
            </Link>
            
            <Link to="/search" className="item">
                Search Users
            </Link>

            <Link to="/profile" className="item">
                View Profile
            </Link>
        </div>
    )
}

export default Header