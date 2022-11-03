import React from "react";
import { Link } from "react-router-dom";


const Comment = ({comment}) => {

  

  return (
    <div class="comment">
      <a class="avatar">
        <img src={"https://i.pravatar.cc/300?u=" + comment.user_id}/>
      </a>
      <div class="content">
        <Link to={`/profile/${ comment.user_id }`} className="author">
            { comment.first_name } { comment.last_name }
        </Link>
        <div class="metadata">
          <div class="date">
            date
          </div>
        </div>
        <div class="text">
          {comment.content}
        </div>
      </div>
  </div>



  )

}

export default Comment;