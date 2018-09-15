import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import "./Customize.css";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class Customize extends Component {
  state = {
    amount: 0,
    products: [],
    user: {}
  };

  componentDidMount() {
    // this.loadProducts();
    this.props.fetchUser();
    this.loadCurrentUser();
  }

  // loadProducts = () => {
  //     API.getProducts()
  //         .then(res => this.setState({ products: res.data }))
  //         .catch(err => console.log(err));
  // };

  loadCurrentUser = () => {
    fetch("/api/current_user")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            user: result
          });

          console.log("result", result);
          let currentUser = this.state.user;
          API.createUser(currentUser)
            .then(console.log("success"))
            .catch(err => console.log(err));

          console.log("state", this.state.user);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  handleStyleChange = input => {
    console.log("well, this is good?")
    const currentUser = this.state.user._id;
    const styleData = {
      border: input.target.value
    }
    // API.changeStyle(currentUser, styleData)
    //   .then(console.log("success"))
    //   .catch(err => console.log(err));
    console.log(styleData)
    
  }


  render() {
    return (
      <div className="customizeGrid">
        {this.state.user.admin ? (
          <AdminHeader amount={this.state.amount} />
        ) : (
          <Header key="1" amount={this.state.amount} />
        )}
        <SideBar user={this.state.user} />

        <Dropdown isOpen={isOpen} toggle={toggle}>
          <DropdownToggle>
            Dropdown
          </DropdownToggle>
          <DropdownMenu
            modifiers={{
              setMaxHeight: {
                enabled: true,
                order: 890,
                fn: (data) => {
                  return {
                    ...data,
                    styles: {
                      ...data.styles,
                      overflow: 'auto',
                      maxHeight: 100,
                    },
                  };
                },
              },
            }}
          >
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <div className="menu">
          <h2>Choose a Style</h2>
          <button onClick={this.handleStyleChange} data-style="dashed">dashed</button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Customize);
