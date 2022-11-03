import React from "react";
import {useState} from 'react';
import axios from '../apis/coreApp'



const SharePost = ({ postId, session }) => {

    const [first, setFirst] = useState('');

    const sharePost = async (event) => {
        event.preventDefault();
        const reqBody = JSON.stringify({ userId: session.userId, postContent: first, sharedPostId: postId })
        const url = "/create/newPost"
        const response = await axios.post(url, reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
        setFirst('');
        console.log(reqBody);
        console.log(response);
    }

    return (
        <div class="">
            <div className="ui hidden divider"></div>
            <form onSubmit={sharePost} class="ui form">
                <div class="field">
                    <div class="ui action input">
                        <input 
                            type="text" 
                            placeholder="Add optional comment to share with post... "
                            onChange={event => setFirst(event.target.value)}
                            value = {first} 
                        />
                        <button type="submit" class="ui button">Add to Timeline</button>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default SharePost;