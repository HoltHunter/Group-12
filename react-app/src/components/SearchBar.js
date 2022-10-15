import React from "react"
import UserCard from "./UserCard"
import axios from '../apis/coreApp';

class SearchBar extends React.Component {
    state = { 
        searchTerm: "",
    }

    sendRequest = (userId, friendRequestId, e) => {
        e.preventDefault();

        if (friendRequestId !== undefined && friendRequestId !== null) {
            const reqBody = JSON.stringify({request_id: friendRequestId, decision: true})
            axios.post('/create/acceptFriendRequest', reqBody, {
                withCredentials: true,
                headers: {"Content-Type": "application/json",}
            })
        } else {
            const reqBody = JSON.stringify({fromId: this.props.session.userId, toId: userId})
            axios.post('/create/friendRequest', reqBody, {
                withCredentials: true,
                headers: {"Content-Type": "application/json",}
            })
        }
        
        console.log("sent a request to", userId);
        console.log("From", this.props.session.userId);
    }

    render() {
        return(
            <div className="ui container">
                <input type="text" placeholder="Search..." onChange={event => {this.setState({searchTerm: event.target.value})}}/>
                <div className="ui relaxed divided list">
                    {this.props.searchableData.filter((user)=> {
                        if (this.state.searchTerm == "") {
                            return ""
                        }
                        if (user.first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) 
                            || user.last_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                            return user
                        }
                    }).map(( user ) => {
                        return (
                            <div key={ user.id } className="item">
                                <UserCard 
                                    user={ user } 
                                    onRequest={ this.sendRequest }
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default SearchBar