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
        <div className="">
            <form onSubmit={submitComment} className="ui form">
                <div className="field">
                    <div className="ui action input">
                        <input 
                            type="text" 
                            placeholder="Add Comment"
                            onChange={event => setFirst(event.target.value)}
                            value = {first}
                            required 
                        />
                        <button type="submit" className="ui button">Leave Comment</button>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default CreateComment;