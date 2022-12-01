import React, { useState } from "react"
import axios from "../apis/coreApp"

function SharePost({ postId, session }) {
    const [first, setFirst] = useState("")

    const sharePost = async (event) => {
        event.preventDefault()
        const reqBody = JSON.stringify({ userId: session.userId, postContent: first, sharedPostId: postId })
        const url = "/create/newPost"
        const response = await axios.post(url, reqBody, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        })
        setFirst("")
        console.log(reqBody)
        console.log(response)
    }

    return (
        <div className="">
            <div className="ui hidden divider" />
            <form onSubmit={sharePost} className="ui form">
                <div className="field">
                    <div className="ui action input">
                        <input
                            type="text"
                            placeholder="Add optional comment to share with post... "
                            onChange={(event) => setFirst(event.target.value)}
                            value={first}
                        />
                        <button type="submit" className="ui button">Add to Timeline</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SharePost
