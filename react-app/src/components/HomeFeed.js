import React from "react";
import PostList from "./PostList";

class HomeFeed extends React.Component {
    render() {
        return (
            <div>
                Home
                <h4>Hi {this.props.session.username}</h4>
                <PostList />
            </div>
        )
    }
}

export default HomeFeed