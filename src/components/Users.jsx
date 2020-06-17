import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import User from '../components/User';
import '../App.css';

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk0NTU3NzQ4LCJqdGkiOiJhMWJhNjFlNWUzMDQ0MWE5YmEzMjc2MmM4OWUyMmRlZiIsInVzZXJfaWQiOjF9.GMjwU9KG97LQMEQCZxRxZ7dPCZSusk-nV_Msn_ekYnI';
const apiUrl = 'https://cors-anywhere.herokuapp.com/https://getkosh.com/api/test/business/job-applications/45';

class Users extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
            count : 5,
            start : 1
        };  
    }

    componentDidMount(){
        const { count, start } = this.state;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };
        axios
        .get(`${apiUrl}/?start=${start}&entries=${count}`,{headers})
        .then(res => this.setState({ users: res.data }))
        .catch(err => console.log(err));
    }

    fetchUsers = () => {
        const { count,start } = this.state;
        let newStart = this.state.start + count;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };
        axios
        .get(`${apiUrl}/?start=${newStart}&entries=${count}`,{headers})
        .then(res => this.setState({ users: this.state.users.concat(res.data) }))
        .catch(err => console.log(err));
        this.setState({ start : newStart });
    }

    render() {
        return(
        <div className="users">
            <InfiniteScroll 
            dataLength={this.state.users.length}
            hasMore={true}
            next={this.fetchUsers}
            loader={<h4 className="loading-text">Loading...</h4>}
            >
                {this.state.users.map( user => (
                    <User 
                    key={user.id} 
                    name={user.application_data.name} 
                    category={user.category} 
                    date_submitted={user.date_submitted}
                    age={user.application_data.age}
                    image_url={user.category_details.image}/>
                ))}
            </InfiniteScroll>
        </div>
        )
    }
}

export default Users;