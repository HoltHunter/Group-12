import React from "react";
import {useState} from 'react';
import axios from '../apis/coreApp'



const CreatePost = ({ session }) => {

    const [first, setFirst] = useState('');

    const submitComment = async ( event ) => {
        event.preventDefault();

        const reqBody = JSON.stringify({ userId: session.userId, postContent: first })
        const response = await axios.post('/create/newPost', reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
        console.log(response);

        setFirst('');
    }

    return (
        <div>
            <form onSubmit={submitComment} className="ui form">
                <div className="field">
                    <label>Post to your timeline:</label>
                    <input 
                        type="text" 
                        placeholder="My post"
                        onChange={event => setFirst(event.target.value)}
                        value = {first}
                        required 
                    />
                    <button type="submit">Post Status</button>
                </div>
            </form>
        </div>
    )

}

export default CreatePost;