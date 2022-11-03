import React from "react";
import Comment from "./comment";
import CreateComment from "./CreateComment"

const CommentList = ( {comments, postId, session} ) => {
  return (
    <div>
      <div className="ui hidden divider"></div>
      <CreateComment
        session={ session }
        postId={ postId }
      />
      <div className="ui comments">
          {
            comments.map((comment) => {
            return (
                <div key={ comment.id } class="">
                    <Comment 
                      comment={ comment } 
                    />
                </div>
            )
        })}
    </div>
  </div>
  )
}

export default CommentList