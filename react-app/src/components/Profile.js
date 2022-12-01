import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import PostList from "./PostList"
import axios from "../apis/coreApp"
import CreatePost from "./CreatePost"

function Profile({ session }) {
    const [userPosts, setUserPosts] = useState([])
    const [userInfo, setUserInfo] = useState(null)
    const { id } = useParams()
    const [users, setUsers] = useState([])

    useEffect(() => {
        retrieveUserInfo(parseInt(id))
        retrievePosts(parseInt(id))
    }, [id])

    const retrieveUserInfo = async (userId) => {
        const reqBody = JSON.stringify({ userId: session.userId })
        const response = await axios.post(`/search/users/${userId}`, reqBody, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        })
        setUserInfo(response.data[0])
    }

    const retrievePosts = async (userId) => {
        const reqBody = JSON.stringify({ userId })
        const response = await axios.post(`/search/posts/${userId}`, reqBody, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        })
        setUserPosts(response.data)
    }

    const getNotifications = async () => {
        const reqBody = JSON.stringify({ userId: session.userId })
        const response = await axios.post("/search/users/", reqBody, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        })
        setUserInfo(response.data[0])
    }

    return (
        <div className="ui container">
            <h1>
                { userInfo && userInfo.first_name }
                {" "}
                { userInfo && userInfo.last_name }
                <Link to="/settings" className="item">
                    <i className="cog icon" />
                </Link>
            </h1>
            <h4>{ userInfo && userInfo.is_friend }</h4>
            { session.userId == id && (
                <div className="ui comments">
                    <CreatePost
                        session={session}
                    />
                </div>
            )}
            <div className="ui feed">
                <PostList
                    session={session}
                    posts={userPosts}
                />
            </div>
        </div>
    )
}

export default Profile
