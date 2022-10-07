import React from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import reactSelect from 'react-select';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


class User extends React.Component {

    state = {
        usersInfo: [],
        searchTerm: "",
        value: "",
        session: []
    }
    
 
    componentDidMount = () => {
        this.getUsers();
        this.getSession();
    }

    getUsers = () => {
        axios.get('/search/users')
        .then(response => {
            //const data = response.data;
            this.setState({ usersInfo: response.data })
            console.log(this.state.usersInfo);
        })
        .catch(() => {
            alert('User list NOT found');
        })
    
    }

    getSession = () => {
        axios.get('/auth/login')
        .then(response => {
            //const data = response.data;
            this.setState({ session: response.data })
            console.log(this.state.session);
        })
        .catch(() => {
            alert('User list NOT found');
        })
    }


    sendRequest = (userid, e) => {
        e.preventDefault();
        fetch("http://localhost:5000/create/friendRequest", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({fromId: this.state.session.id, toId: userid}),
        })
        console.log("sent a request to", userid);
        console.log("From", this.state.session.id);
    }

    render() {
         return(
             <div>
                <h1>Hi {this.state.session.username}</h1>
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
                                    <Button variant="outline-success" onClick={(e) => this.sendRequest(listValue.first_name, e)}>Send Friend Request</Button>
                                </ListGroup.Item>

                        </ListGroup>
                    );
                })}
            </div>
        );
    }
}
export default User;