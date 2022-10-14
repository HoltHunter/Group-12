import React from "react";
import IconButton from "./IconButton";

const UserCard = ({ user, onRequest }) => {
    const renderButton = () => {
        if (user.is_friend) {
            return 
        } else {
            return <IconButton 
                iconName="user plus"
                label={ (user.friend_request_id !== undefined && user.friend_request_id !== null) 
                    ? `Accept Friend Request` : `Send Friend Request` }
                onClick={ (e) => onRequest(user.id, user.friend_request_id, e) }
            />
        }
    }

    return (
        <div>
            <div>
                {user.first_name} {user.last_name} {console.log(user)}
            </div>
            { renderButton() }
        </div>
    )
}

export default UserCard