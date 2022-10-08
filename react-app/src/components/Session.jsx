import React from 'react';
import axios from 'axios';

export default function Session() {
  	axios.get('/auth/login')
		.then(response => {
		console.log(response.data);
			return response.data;
			// this.setState({session: response.data});
			//this.getOpenRequests();
			//console.log(this.state.session);
		})
		.catch(() => {
			alert('User list NOT found');
		})
}
