import React from "react";
import UserCard from './UserCard'

const UserSearchList = ({ data, sendRequest }) => {
    return (
        <div className="ui relaxed divided list">
            { 
                data.map((user) => {
                    return (
                        <div key={ user.id } className="item">
                            <UserCard 
                                user={ user } 
                                onRequest={ sendRequest }
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserSearchList