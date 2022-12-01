import React from "react"
import Post from "./Post"

function PostList({ posts, session }) {
    return (
        <div>
            <h4>Timeline:</h4>
            <div className="ui relaxed list">
                {
                    posts.map((post) => (
                        <div key={post.id} className="item">
                            <Post
                                session={session}
                                post={post}
                            />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default PostList
