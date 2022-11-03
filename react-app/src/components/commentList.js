import React from "react";
import Comment from "./comment";
import CreateComment from "./CreateComment"

const CommentList = ( {comments, postId, session} ) => {
  return (
    <div>
      <CreateComment
        session={ session }
        postId={ postId }
      />
      <div class="ui comments">
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