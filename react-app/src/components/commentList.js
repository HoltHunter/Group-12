import React from "react"
import Comment from "./comment"
import CreateComment from "./CreateComment"

function CommentList({ comments, postId, session }) {
    return (
        <div>
            <div className="ui hidden divider" />
            <CreateComment
                session={session}
                postId={postId}
            />
            <div className="ui comments">
                {
                    comments.map((comment) => (
                        <div key={comment.id} className="">
                            <Comment
                                comment={comment}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CommentList
