import React, { useState } from "react"
import axios from "../apis/coreApp"

function CreatePost({
    session, postId, initialValue, toggleEdit,
}) {
    const [first, setFirst] = useState(initialValue || "")

    const submitComment = async (event) => {
        event.preventDefault()

        if (postId) {
            const reqBody = JSON.stringify({ postContent: first })
            const response = await axios.post(`/create/posts/${postId}`, reqBody, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            toggleEdit(first)
        } else {
            const reqBody = JSON.stringify({ userId: session.userId, postContent: first })
            const response = await axios.post("/create/newPost", reqBody, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })

            setFirst("")
        }
    }

    return (
        <div>
            <form onSubmit={submitComment} className="ui form">
                <div className="field">
                    <label>Post to your timeline:</label>
                    <div className="ui action input">
                        <input
                            type="text"
                            placeholder="My post"
                            onChange={(event) => setFirst(event.target.value)}
                            value={first}
                            required
                        />
                        <button className="ui button primary" type="submit">Post Status</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePost
