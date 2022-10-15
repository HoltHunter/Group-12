import React from 'react';
import axios from '../apis/coreApp'
import SearchBar from './SearchBar'

class SearchView extends React.Component {
    state = {
        usersInfo: []
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
        console.log(response)
    }

    render() {
        if (this.props.session) {
            return(
                <div>
                    <h1>Hi {this.props.session.username}</h1>
                    <SearchBar 
                        searchableData={ this.state.usersInfo } 
                        session={ this.props.session }
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