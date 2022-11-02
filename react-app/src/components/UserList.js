import React from "react";
import UserCard from './UserCard'

const UserList = ({ data, onRequest }) => {
    return (
        <div className="ui relaxed divided list">
            { 
                data.map((user) => {
                    return (
                        <div key={ user.id } className="item">
                            <UserCard 
                                user={ user } 
                                onRequest={ onRequest }
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserList