import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from '../apis/coreApp'



const Header = (session, signOut) => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
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
    }

    const filterFriends = () => {
        return users.filter((user) => {
            if (user.friend_request_id !== undefined && user.friend_request_id !== null) {
                return user
            } 
        })
    }

    const respondRequest = (userId, friendRequestId, decision, e) => {
        e.preventDefault();

        const reqBody = JSON.stringify({request_id: friendRequestId, decision: decision})
        axios.post('/create/acceptFriendRequest', reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
        
        setUsers(users.filter(user => user.id !== userId))

        console.log("sent a request to", userId);
        console.log("From", session.session.userId);
    }



    return (
        <div className="ui secondary pointing menu">
            <Link to="/home" className="item">
                <i className="home icon" />
                <p className="labels">Home</p>
            </Link>
            
            <Link to="/search" className="item">
                <i className="search icon" />
                <p className="labels">Search Users</p>
            </Link>

            { session && 
            <Link to={`/profile/${ session.session.userId }`} className="item">
                <i className="user circle icon" />
                <p className="labels">View Profile</p>
            </Link>}

            { session &&
            <div className="ui icon top left simple dropdown button">
            <i className={filterFriends().length > 0 ? "bell green icon" : "bell icon"}></i>
            <div className="menu">
              <div className="header">Notifications</div>
              {
                filterFriends().map((user) => {
                        return (
                            <div key={ user.id } className="item">
                                <div className="item">{user.first_name} {user.last_name}</div>
                                <div className="ui small basic icon buttons">
                                    <button className="ui button" onClick={(e) => respondRequest(user.id, user.friend_request_id, true, e)}><i className="checkmark green icon"></i></button>
                                    <button className="ui button" onClick={(e) => respondRequest(user.id, user.friend_request_id, false, e)}><i className="x red icon"></i></button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
          </div>
            }
            
            { session && <div className="right menu">
                <Link to='/' className="ui button negative" onClick={ signOut }>
                    Sign Out
                </Link>
            </div>}
        </div>
    )
}

export default Header