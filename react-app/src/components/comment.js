import React from "react";



const Comment = ({comment}) => {

  

  return (
    <div>
      <h6>{comment.user_id}</h6>
      <p>{comment.content}</p>
    </div>
  )

}

export default Comment;