import React, { useEffect } from "react";
import PostList from "./PostList";
import { useState } from 'react'
import axios from "../apis/coreApp";
import { useParams } from "react-router-dom";
import CreatePost from "./CreatePost";

// TODO:
// Can we reuse a Comment component to also make new posts?
// If Profile user =/= logged in user, and user is not logged in user's friend, show a Request Friend button.

// Link to Profile can probably be a URL parameter. like .../profile/?userId=4

// Feel free to refactor into a functional component if that makes it easier:

const Profile = ({ session }) => {
    const [userPosts, setUserPosts] = useState([])
    const [userInfo, setUserInfo] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        retrieveUserInfo(parseInt(id))
        retrievePosts(parseInt(id))
    }, [])

    const retrieveUserInfo = async (userId) => {
        const reqBody = JSON.stringify({ userId: session.userId })
        const response = await axios.post(`/search/users/${ userId }`, reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
        setUserInfo(response.data[0])
    }

    const retrievePosts = async (userId) => {
        const reqBody = JSON.stringify({ userId })
        const response = await axios.post(`/search/posts/${ userId }`, reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
        setUserPosts(response.data)
    }

    return (
        <div className="ui container">
            <h1>{ userInfo && userInfo.first_name } { userInfo && userInfo.last_name }</h1>
            <h4>{ userInfo && userInfo.is_friend }</h4>
            { session.userId == id && <div className="ui comments">
                <CreatePost
                    session={ session }
                />
            </div>}
            <div className="ui feed">
                <PostList 
                    session={ session }
                    posts={ userPosts }
                />
            </div>
        </div>
    )
}

export default Profile