import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from '../apis/coreApp'



const Header = (session, signOut) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("test1", session.session.userId);
        getUsers();
    }, []);

    const getUsers = async () => {
        console.log("test2");
        const reqBody = JSON.stringify({ userId: session.session.userId })
        const response = await axios.post('/search/users', reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
        setUsers(response.data);
        console.log("Hello world");
        console.log(response.data);
        filterFriends();
        //console.log(users);
    }

    const filterFriends = () => {
        users.filter((user) => {
            if (user.friend_request_id !== undefined && user.friend_request_id !== null) {
                return user
            } else {
                return
            }
        })
    }



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

            { session &&
            <div className="ui icon top left simple dropdown button">
            <i className="bell icon"></i>
            <div className="menu">
              <div className="header">Notifications</div>
              {
                users.map((user) => {
                        return (
                            <div key={ user.id } className="item">
                                {user.first_name}
                            </div>
                        )
                    })
                }

            </div>
          </div>
            }
            
            { session && <div className="right menu">
                <Link to='/' className="item" onClick={ signOut }>
                    Sign Out
                </Link>
            </div>}
        </div>
    )
}

export default Header