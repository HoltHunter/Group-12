import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = (session) => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/home" className="item">
                Home
            </Link>
            
            <Link to="/search" className="item">
                Search Users
            </Link>

            { session && 
            <Link to={`/profile/${ session.session.userId }`} className="item">
                View Profile
            </Link>}
        </div>
    )
}

export default Header