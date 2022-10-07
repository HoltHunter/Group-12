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
        value: ""
    }
    
 /*    searchToggle = () => {

        React.forwardRef(({children, onClick}, ref) => (
            <a
                href=""
                ref={ref}
                onClick={(e) => {
                e.preventDefault();
                onClick(e);
                }}
            >
                {children}
                &#x25bc;
            </a>
        ));
    }

    CustomMenu = () => {
        React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      
          return (
            <div
              ref={ref}
              style={style}
              className={className}
              aria-labelledby={labeledBy}
            >
              <Form.Control
                autoFocus
                className="mx-3 my-2 w-auto"
                placeholder="Type to filter..."
                onChange={(e) => {this.setState({searchTerm: e.target.value})}}
                value={this.state.value}
              />
              <ul className="list-unstyled">
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

                                <ListGroup.Item action href="#">{listValue.first_name}</ListGroup.Item>

                        </ListGroup>
                    );
                })}
              </ul>
            </div>
          );
        },
      );
    } */
    componentDidMount = () => {
        this.getUsers();
    }

    getUsers = () => {
        axios.get('/users')
        .then(response => {
            //const data = response.data;
            this.setState({ usersInfo: response.data })
            console.log(this.state.usersInfo);
        })
        .catch(() => {
            alert('User list NOT found');
        })

      
    }

    render() {
         return(
/*             <Dropdown>
                <Dropdown.Toggle as={this.searchToggle} id="dropdown-custom-components">
                Custom toggle
                </Dropdown.Toggle>

                <Dropdown.Menu as={this.CustomMenu}>
                <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                <Dropdown.Item eventKey="3" active>
                    Orange
                </Dropdown.Item>
                <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>, */
             <div>
                <h1>Search User</h1>
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
                                    <Button variant="outline-success">Send Friend Request</Button>
                                </ListGroup.Item>

                        </ListGroup>
                    );
                })}
            </div>
        );
    }
}
export default User;