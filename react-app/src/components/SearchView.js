import React from 'react';
import axios from '../apis/coreApp'
import SearchBar from './SearchBar'
import UserList from './UserList';

class SearchView extends React.Component {
    state = {
        usersInfo: [],
        searchTerm: ""
    }
    
    componentDidMount = () => {
        this.getUsers();
    }

    getUsers = async () => {
        const reqBody = JSON.stringify({ userId: this.props.session.userId })
        const response = await axios.post('/search/users', reqBody, {
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
        this.setState({ usersInfo: response.data })
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

    filterData = (searchTerm) => {
        return this.state.usersInfo.filter((user)=> {
            if (searchTerm == "") {
                return
            }
            if (user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) 
                || user.last_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return user
            }
        })
    }

    onFormSubmit = (searchTerm) => {
        this.setState({ searchTerm: searchTerm })
    }

    render() {
        if (this.props.session) {
            return(
                <div className='ui container'>
                    <h1>Hi {this.props.session.username}</h1>
                    <SearchBar 
                        onFormSubmit={ this.onFormSubmit }
                    />
                    <UserList 
                        data={ this.filterData(this.state.searchTerm) } 
                        onRequest={ this.sendRequest }
                    />
               </div>
           )
        } else {
            return (
                <div>Loading...</div>
            )
        }
         
    }
}
export default SearchView;