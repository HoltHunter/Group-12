import React from "react";
import IconButton from "./IconButton";
import CommentList from "./commentList";
import { useState } from "react";
import axios from '../apis/coreApp';


// Can model this component on UserCard, to start.

// Need to render the following:
// 1. User First & Last Names
// 2. Post create timestamp
// 3. Post content
// 4. Like button -> This could be its own component, LikeButton.js, as a specific implementation of IconButton?
// 5. Comment button -> This could be its own component, CommentField.js
// 6. Share button 
// 7. User icon / profile pic. Can use a placeholder for now, like UserCard does.
// 8. User name is a link to user Profile.



const Post = ({post, session}) => {

    const [showComments, setShowComments] = useState(false);
    const [postComments, setComments] = useState([]);

    const getComments = async () => {
        const reqBody = ""
        const url = "/search/posts/" + post.user_id + "/comments/" + post.id
        const response = await axios.post(url, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
        setComments(response.data)
    }

    const revealComments = (e) => {
        e.preventDefault();
        if (!showComments) {
            getComments();
        }
        setShowComments(current => !current);
    }

    return (
        <div className="ui card">
            <div className="content">
                <h6>On {post.date_created}, {post.first_name} {post.last_name} posted:</h6>
                <p>{post.content}</p>
                <div>
                    <div className="ui row">
                        <IconButton
                            iconName="share"
                            label=""
                            onClick=""
                        />
                        <IconButton 
                            iconName="heart"
                            label={post.likes_count}
                            onClick=""
                        />
                    </div>
                    <div>
                        <IconButton
                            iconName="comment"
                            label={ showComments ? "Hide Comments" : "Show Comments"}
                            onClick={(e) => revealComments(e)}
                        />
                    </div>
                    {showComments && <CommentList
                    session={session}
                    comments={postComments}
                    postId={post.id}
                    />}
                </div>
            </div>
        </div>
            
    )
}

export default Post