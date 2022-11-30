import React from "react";
import IconButton from "./IconButton";
import CommentList from "./commentList";
import SharePost from "./SharePost";
import { useState } from "react";
import axios from '../apis/coreApp';
import CreatePost from "./CreatePost";
import { Link } from "react-router-dom";


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
    const [editMode, setEditMode] = useState(false)
    const [showShare, setShowShare] = useState(false);
    const [postComments, setComments] = useState([]);
    const [postLikes, setPostLikes] = useState(post.likes_count);

    const getComments = async () => {
        const reqBody = ""
        const url = "/search/posts/" + post.user_id + "/comments/" + post.id
        const response = await axios.post(url, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
        setComments(response.data)
    }

    const toggleShowShare = (e) => {
        e.preventDefault();
        setShowShare(current => !current);
    }

    const revealComments = (e) => {
        e.preventDefault();
        if (!showComments) {
            getComments();
        }
        setShowComments(current => !current);
    }

    const sendLike = async () => {
        const reqBody = JSON.stringify({ userId: session.userId, postId: post.id })
        const url = "/create/likes"
        const response = await axios.post(url, reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
    }

    const likePost = (e) => {
        sendLike();
        setPostLikes(post.likes_count);
    }

    const getDate = () => {
        const postDate = new Date(post.date_created);
        return postDate.toLocaleString()
    }


    const renderSharedPost = (sharedPost) => {
        return (
            <div className="ui centered fluid card">
                <div className="content">
                    <div className="right floated meta"><p className="date">{ new Date(sharedPost.date_created).toLocaleString() }</p></div>
                    <div className="header">
                        <Link to={`/profile/${ sharedPost.user_id }`} >
                            <img className="ui avatar image" src={sharedPost.profile_icon + ".png"}/>
                            { sharedPost.first_name }
                        </Link>
                    </div>
                </div>
                <div className="content">
                    <p>{sharedPost.content}</p>
                </div>
            </div>
        )
    }

    const toggleEditMode = (newContent) => {
        setEditMode(editMode => !editMode)
        post.content = newContent
    }

    return (
        <div className="ui centered fluid grey card">
            <div className="content">
                <div className="right floated meta">
                    <p className="date">{ getDate() }</p>
                    { post.user_id === session.userId && <i className="edit icon" onClick={ () => toggleEditMode(post.content) }/>}
                </div>
                <div className="header">
                    <Link to={`/profile/${ post.user_id }`} >
                        <img className="ui avatar image" src={post.profile_icon + ".png"}/>
                        { post.first_name }
                    </Link>
                </div>
            </div>
            <div className="content">
                { !editMode && <p>{post.content}</p>}
                { editMode && <CreatePost session={ session } postId={ post.id } initialValue={ post.content } toggleEdit={ toggleEditMode } />}
                { post.shared_post && renderSharedPost(post.shared_post) }
            </div>
            <div className="content">
                <div>
                    <div className="ui">
                        <IconButton 
                            iconName={ post.liked ? " red heart" : "heart outline"}
                            label={postLikes}
                            onClick={(e) => likePost(e)}
                        />
                        <IconButton
                            iconName="share"
                            label=""
                            onClick={(e) => toggleShowShare(e)}
                        />
                        <IconButton
                            iconName="comment"
                            label={ showComments ? "Hide" : "Show"}
                            onClick={(e) => revealComments(e)}
                        />
                    </div>
                    {showComments && 
                    <CommentList
                        session={session}
                        comments={postComments}
                        postId={post.id}
                    />}
                    {showShare && 
                    <SharePost
                        session={session}
                        postId={post.id}
                    />}
                </div>
            </div>
        </div>

            
    )
}

export default Post