import React from "react";
import Comment from "./comment";

const testComments = [
  {
      "user_id": '1',
      "username": 'landonhh99@gmail.com',
      "post_id": '1',
      "date_created": '2022-10-26 18:36:10.98',
      "content": 'Awesome post!!'
  },
  {
      "user_id": '2',
      "username": 'test@test.com',
      "post_id": '1',
      "date_created": '2022-10-26 18:36:10.98',
      "content": 'Eh, I\'ve seen better...'
  },
  {
      "user_id": '1',
      "username": 'landonhh99@gmail.com',
      "post_id": '1',
      "date_created": '2022-10-26 18:36:10.98',
      "content": 'Hello world.'
  },
]

const CommentList = () => {
  return (
    <div>
      {
        testComments.map((comment) => {
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

export default CommentList