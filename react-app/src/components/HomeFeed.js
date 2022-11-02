import React from "react";
import PostList from "./PostList";
import axios from '../apis/coreApp';

class HomeFeed extends React.Component {
    
    state = {
        userPosts: []
    }

    componentDidMount = () => {
        this.getPosts();
    }

    getPosts = async () => {
        const reqBody = JSON.stringify({ userId: this.props.session.userId })
        const response = await axios.post('/search/posts', reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
        this.setState({ userPosts: response.data })
    }

    render() {
        return (
            <div>
                Home
                <h4>Hi {this.props.session.username}</h4>
                <PostList 
                    session={this.props.session}
                    posts={this.state.userPosts}
                />
            </div>
        )
    }
}

export default HomeFeed