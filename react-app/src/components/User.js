import React from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import reactSelect from 'react-select';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
//import Session from './session';

const baseUrl = "http://localhost:8081"

class User extends React.Component {
    state = {
        usersInfo: [],
        searchTerm: "",
        value: "",
        openRequests: [],
        friends: []
    }
    
    componentDidMount = () => {
        this.getUsers();
        this.getOpenRequests();
    }

    getUsers = () => {
        axios.get(`${baseUrl}/search/users`)
            .then(response => {
                this.setState({ usersInfo: response.data })
            })
            .catch(() => {
                console.log('User list NOT found');
            })
    }

    sendRequest = (userid, e) => {
        e.preventDefault();
        
        const requestId = this.state.openRequests.filter( (el) => el.request_from_id )
        console.log(requestId)
        if (requestId.length === 1) {
            fetch(`${baseUrl}/create/acceptFriendRequest`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({request_id: requestId[0].id, decision: "true"}),
            })
        } else {
            fetch(`${baseUrl}/create/friendRequest`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({fromId: this.props.session.userId, toId: userid}),
            })
        }
        
        console.log("sent a request to", userid);
        console.log("From", this.props.session.userId);
    }

    getOpenRequests = () => {
        const reqBody = JSON.stringify({userId: this.props.session.userId})
        axios.post(baseUrl + `/search/friendRequests`, reqBody, { 
            withCredentials: true,
            headers: {"Content-Type": "application/json",}
        })
            .then(response => {
                this.setState({ openRequests: response.data })
                console.log("data", response.data);
            })
            .catch(() => {
                console.log('User list NOT found');
            })

        console.log(JSON.stringify({userId: this.props.session.userId}), this.state.openRequests);
    }

    getCurrentFriends = () => {
        fetch(`${baseUrl}/search/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId: this.props.session.userId}),
        })
        .catch(err => {
            return;
        })
        .then(data => {
            this.setState({ friends: data })
        });
        console.log("Current Friends:");
        console.log(this.state.friends);
    }

    requestButton = (listValue) => {
        if (this.state.openRequests.map( (el) => el.request_from_id ).includes(listValue)) {
            return (
                <div>
                    <Button variant="outline-success" onClick={(e) => this.sendRequest(listValue, e)}>Accept Friend Request</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Button variant="outline-success" onClick={(e) => this.sendRequest(listValue, e)}>Send Friend Request</Button>
                </div>
            )
        }
    }

    render() {
        if (this.props.session) {
            return(
                <div>
                   <h1>Hi {this.props.session.username}</h1>
                   <input type="text" placeholder="Search..." onChange={event => {this.setState({searchTerm: event.target.value})}}/>
                   {this.state.usersInfo.filter((val)=> {
                       if (this.state.searchTerm == "") {
                           return ""
                       }
                       if (val.first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                           return val
                       }
                   }).map(( listValue, index ) => {
                       return (
                           <ListGroup key={index}>
                               <ListGroup.Item>
                                   <h5>{listValue.first_name}</h5>
                                        {this.requestButton(listValue.id)}
                               </ListGroup.Item>
                           </ListGroup>
                       );
                   })}
               </div>
           )
        } else {
            return (
                <div>Loading...</div>
            )
        }
         
    }
}
export default User;