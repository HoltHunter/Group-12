import React from "react";
import PostList from "./PostList";

// TODO:
// Can we reuse a Comment component to also make new posts?
// If Profile user =/= logged in user, and user is not logged in user's friend, show a Request Friend button.

// Link to Profile can probably be a URL parameter. like .../profile/?userId=4

// Feel free to refactor into a functional component if that makes it easier:
// const Profile = () => {
class Profile extends React.Component {
    render() {
        return (
            <div>
                Profile
                <PostList />
            </div>
        )        
    }
}

export default Profile