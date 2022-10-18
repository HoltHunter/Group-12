import React from "react";
import Post from "./Post";

// PostList should accept an array of posts. 
// Home will request an array of mixed authorship received from the server.
// Profile will request a specific author's posts from the server.

// Can model this component on UserList.js

const PostList = () => {
    return (
        <div>
            PostList
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default PostList