import React from "react";
import IconButton from "./IconButton";

const UserCard = ({ user, onRequest }) => {
    const renderButton = () => {
        if (user.is_friend) {
            return 
        } else {
            return (
                <div className="">
                    <IconButton 
                        iconName="user plus"
                        label={ (user.friend_request_id !== undefined && user.friend_request_id !== null) 
                            ? `Accept Request` : `Send Request` }
                        onClick={ (e) => onRequest(user.id, user.friend_request_id, e) }
                    />
                </div>
            )
        }
    }

    return (
        <div key={user.id} className="ui card">
            <div className="content">
                <i className="large middle aligned icon user left floated" />
                <div className="header">
                    
                    { user.first_name } { user.last_name }
                    { renderButton() }
                </div>
            </div>
        </div>
    )
}

export default UserCard