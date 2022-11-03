import React from "react";
import Post from "./Post";

// PostList should accept an array of posts. 
// Home will request an array of mixed authorship received from the server.
// Profile will request a specific author's posts from the server.

// Can model this component on UserList.js

const PostList = ( {posts, session} ) => {
    return (
        <div>
        <h4>Timeline:</h4>
        <div className="ui relaxed divided list">
            { 
                posts.map((post) => {
                    return (
                        <div key={ post.id } className="item">
                            <Post 
                                session={session}
                                post={ post } 
                            />
                        </div>
                    )
                })
            }
        </div>
    
        </div>
    )
}

export default PostList