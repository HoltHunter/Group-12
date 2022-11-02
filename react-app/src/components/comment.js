import React from "react";



const Comment = ({comment}) => {

  

  return (
    <div>
      <h5>{comment.first_name} {comment.last_name}</h5>
      <p>{comment.content}</p>
    </div>
  )

}

export default Comment;