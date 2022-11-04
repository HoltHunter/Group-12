import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = (session, signOut) => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/home" className="item">
                <i className="home icon" />
                Home
            </Link>
            
            <Link to="/search" className="item">
                <i className="search icon" />
                Search Users
            </Link>

            { session && 
            <Link to={`/profile/${ session.session.userId }`} className="item">
                <i className="user circle icon" />
                View Profile
            </Link>}

            { session && <div className="right menu">
                <Link to='/' className="ui button negative" onClick={ signOut }>
                    Sign Out
                </Link>
            </div>}
        </div>
    )
}

export default Header