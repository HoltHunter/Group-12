import React from "react";
import { Link } from "react-router-dom";


const Comment = ({comment}) => {

  

  return (
    <div className="comment">
      <a className="avatar">
      <img className="" src={comment.profile_icon + ".png"}/>
      </a>
      <div className="content">
        <Link to={`/profile/${ comment.user_id }`} className="author">
            { comment.first_name } { comment.last_name }
        </Link>
        <div className="metadata">
          <div className="date">
            date
          </div>
        </div>
        <div className="text">
          {comment.content}
        </div>
      </div>
  </div>



  )

}

export default Comment;