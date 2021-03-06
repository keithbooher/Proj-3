import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


import List from "../List/List";
import Anchor from "../Anchor/Anchor"
import API from "../../utils/API";


class LoggedInSidebar extends Component {

    state = {
        user: {},
    }

    componentDidMount() {
        this.props.fetchUser();
        this.loadCurrentUser();    
         
    }

    loadCurrentUser = () => {
        fetch("/api/current_user")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    user: result
                });

                console.log('result', result)
                let currentUser=this.state.user                       
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        )
    };

    render(){
        return(
            <div>
                <List>
                    <Anchor 
                        text="View your page"
                        href={`/artist/?${this.state.user._id}`} 
                    />                   
                </List>
            </div>
        )
    }
}

export default connect(null, actions) (LoggedInSidebar);
