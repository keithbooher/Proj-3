import React, { Component } from 'react';
import {connect } from 'react-redux';
import API from "../../utils/API";


import List from "../List/List";
import UnorderedList from "../List/UnorderedList";
import "./Sidebar.css";
import Anchor from "../Anchor/Anchor"

class Sidebar extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        this.loggedIn();
        this.loadCurrentUser();   
    }


    loggedIn = () => {
        if (Object.keys(this.state.user).length == 0) {
            console.log("not logged in")
            return false
        } else {
            console.log("logged in")
            return true
        }
    }

    adminStatus = () => {
        if(this.loggedIn() === true) {
            if (this.state.user.admin === false || null) {
                console.log("not an admin")
                return false
            } else {
                console.log("you are an admin")
                return true
            }
        } else {
            return false
        }

    }

    loadCurrentUser = () => {
        fetch("/api/current_user")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    user: result
                });
            console.log("state", this.state.user)      
            this.loggedIn();  
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
            <div class = "sideBar">
                <h5 className="sidebarTitle">Explore the Gutter</h5>
                <UnorderedList>
                    <List>
                        <Anchor 
                            text="View Top Trending Art"
                            href="/trending"
                        />                   
                    </List>
                    <List>
                        <Anchor 
                            text="View All Our Artists"
                            href="/artists"
                        />                   
                    </List>
                    <List>
                        <Anchor 
                            text="View Top Trending Art"
                            href="/trending"
                        />                   
                    </List>
                    {this.adminStatus() ? 
                    <List>
                        <Anchor 
                            text="Customize Your Page"
                            href="/customize"
                        />                   
                     </List> : ""
                    }
                    <List>
                        <Anchor 
                            text="Become Admin"
                            href={this.loggedIn() ? "/admin" : "/auth/google"}
                        />                   
                     </List>
                    

                </UnorderedList>
            </div>
        );
    }
}

// telling this component if we are logged in or not and what to show occordingly
function mapStateToProps({ auth }) {
    return { auth };
}


export default connect(mapStateToProps)  (Sidebar);