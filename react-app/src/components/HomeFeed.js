import React from "react";
import PostList from "./PostList";

class HomeFeed extends React.Component {
    render() {
        return (
            <div>
                Home
                <PostList />
            </div>
        )
    }
}

export default HomeFeed