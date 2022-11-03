import React from "react";
import {useState} from 'react';
import axios from '../apis/coreApp'



const CreateComment = ({ postId, session }) => {

    const [first, setFirst] = useState('');

    const submitComment = async ( event ) => {
        event.preventDefault();

        const reqBody = JSON.stringify({ userId: session.userId, postId: postId, comment: first })
        const response = await axios.post('/create/post/comment', reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
        console.log(response);

        console.log('submitted', first, "to", postId);
        console.log(session);
        setFirst('');
    }

    return (
        <div class="">
            <form onSubmit={submitComment} class="ui form">
                <div class="field">
                    <input 
                        type="text" 
                        placeholder="Add Comment"
                        onChange={event => setFirst(event.target.value)}
                        value = {first}
                        required 
                    />
                    <button type="submit" class="ui button">Leave Comment</button>
                </div>
            </form>
        </div>
    )

}

export default CreateComment;