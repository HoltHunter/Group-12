import React from "react";
import IconButton from "./IconButton";
import Comment from "./comment";

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
const testComments = [
    {
        "user_id":'1',
        "post_id": '1',
        "date_created": '2022-10-26 18:36:10.98',
        "content": 'Awesome post!!'
    },
    {
        "user_id":'2',
        "post_id": '1',
        "date_created": '2022-10-26 18:36:10.98',
        "content": 'Eh, I\'ve seen better...'
    },
    {
        "user_id":'1',
        "post_id": '1',
        "date_created": '2022-10-26 18:36:10.98',
        "content": 'Hello world.'
    },
]


const Post = ({post}) => {
    return (
        <div className="">
            <h6>On {post.date_created}, userID {post.user_id} posted:</h6>
            <p>{post.content}</p>
            <IconButton 
                iconName="heart"
                label={post.likes_count}
                onClick=""
            />
            {testComments.map((comment) => {
                    return (
                        <div key={ comment.id } className="item">
                            <Comment 
                                comment={ comment } 
                            />
                        </div>
                    )
                })}
        </div>
            
    )
}

export default Post