import React from "react";
import Post from "./Post";

// PostList should accept an array of posts. 
// Home will request an array of mixed authorship received from the server.
// Profile will request a specific author's posts from the server.

// Can model this component on UserList.js

const testPosts = [
    {
        "id": '1',
        "date_created": '2022-10-26 15:39:10.00',
        "date_modified": '',
        "user_id": '1',
        "username": 'landonhh99@gmail.com',
        "content": 'Hello world. This is my post. Please like!',
        "likes_count": '22'
    },
    {
        "id": '2',
        "date_created": '2022-10-27 15:39:10.00',
        "date_modified": '',
        "user_id": '2',
        "username": 'test@test.com',
        "content": 'Hi! like my post instead.',
        "likes_count": '22'
    },
    {
        "id": '3',
        "date_created": '2022-10-28 15:39:10.00',
        "date_modified": '',
        "user_id": '1',
        "username": 'landonhh99@gmail.com',
        "content": 'I\'m just posting because I am bored.',
        "likes_count": '22'
    }
]


const PostList = () => {
    return (
        <div>
        <h4>Timeline:</h4>
        <div className="ui relaxed divided list">
            { 
                testPosts.map((post) => {
                    return (
                        <div key={ post.id } className="item">
                            <Post 
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