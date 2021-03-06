import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import { Redirect } from "react-router-dom";
// import InventoryCard from "../../components/Card/InventoryCard";
import "./ManageInventory.css";
import Footer from "../../components/Footer/Footer";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

class ManageInventory extends Component {
  state = {
    user: {},
    productIDs: [],
    products: [],
    currentUser: {},
    value: [],
    quantity: 0,
    toDashboard: false,
    top: "toggle",
    sidebarMobile: "sideBarMobile",
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadCurrentUser();
    this.checkTop();
  }

  componentWillMount() {
    this.checkToggle();

  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  checkTop = () => {
    window.onscroll = function () {
      if (window.pageYOffset === 0) {
        this.setState({ top: "toggle", sidebarMobile: "sideBarMobile" })
      } else {
        this.setState({ top: "notTopToggle", sidebarMobile: "sideBarMobileNotTop" })
      }
    }.bind(this);
  }

  checkToggle = () => {
    this.setState({ sidebarOpen: false, toggleID: "close", moveToggler: "moveTogglerClose" })

  }

  toggle = () => {
    if (this.state.sidebarOpen) {
      this.setState({ sidebarOpen: false, toggleID: "close", moveToggler: "moveTogglerClose" })
    } else {
      this.setState({ sidebarOpen: true, toggleID: " ", moveToggler: " " })
    }
  }

  //  Function to handle form input
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    // let tempVar = this.state.value;
    // tempVar[i] = event.target.value;
    // this.setState({ value: tempVar });
    this.setState({ [name]: value });
  };

  handleFormSubmit = id => {
    const value = this.state[id];
    const newQuantity = {
      quantity: value
    };

    if (value < 1) {
      API.updateSoldTrue(id).then(result => {
      });
    } else {
      API.updateSold(id).then(result => {
      });
    }

    API.updateQuantity(id, newQuantity)
      .then(dbModel => this.setState({ toDashboard: true }))
      .catch(err => console.log(err));
  };

  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }


  loadUsersProducts = () => {
    const productIDs = this.props.auth.product;
    // const productObjectsArray = [];
    for (let i = 0; i < productIDs.length; i++) {
      API.getProduct(productIDs[i])
        .then(result => {
          this.setState({ products: this.state.products.concat(result) });
        })
        .catch(err => console.log(err));
    }
  };

  consolelog = () => {

  };

  // ??????????????????????????????????????????????????????????????
  // ????? ANOTHER INSTANCE OF REDUX ACTING REALLY WEIRD ??????????
  // ??????????????????????????????????????????????????????????????  
  // loadCurrentUser = () => {
  //   this.setState({
  //     isLoaded: true,
  //     currentUser: this.props.auth,
  //     productIDs: this.props.auth.product,
  //     quantity: this.props.auth.quantity
  //   });
  //   console.log("current user: ", this.props);
  //   this.loadUsersProducts();
  // };

  loadCurrentUser = () => {
    API.getCurrentUser()
      .then(result => {
        this.setState({
          isLoaded: true,
          currentUser: result.data,
          productIDs: result.data.product,
          quantity: result.data.quantity
        })
        this.loadUsersProducts();
      })
      .catch(err => console.log(err));
  };



  render() {
    if (this.state.toDashboard === true) {
      return (
        // <Redirect to={`/artist/${this.state.currentUser._id}`} test={"hello"} />
        <Redirect
          to={{
            pathname: `/artist/${this.state.currentUser._id}`,
            state: { hello: "test" }
          }}
        />
      );
    }
    return (
      <div className="artistGrid">

        <Header key="1" amount={this.state.amount} />

        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className={this.state.top}>☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} sidebarMobile={this.state.sidebarMobile} />
        </div>

        <div className="container productContent">
          <div className="productCard">
            {console.log("MAP STATE", this.state.products)}
            {this.state.products.map((product, i) => {
              console.log("PRODUCT", i, product.data);
              return (
                <div className="artCard" key={i}>
                  <img
                    className="card-img-top"
                    src={product.data.img}
                    alt={product.data.productName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.data.productName}</h5>
                    <p className="card-text">
                      ${product.data.price}
                    </p>
                    <p className="card-text description">{product.data.description}</p>
                    <form onKeyPress={this.onKeyPress} className="manageForm">
                      <div className="form-group">
                        <label htmlFor="description">Quantity: </label>
                        <input
                          name={product.data._id}
                          value={this.state.value[i]}
                          onChange={e => {
                            console.log(e);
                            this.handleInputChange(e);
                            //this.handleInputChange(i, e);
                          }}
                          type="integer"
                          className="form-control"
                          id="quantity"
                          placeholder={product.data.quantity}
                        />
                      </div>
                      {/* <div className={this.state.alertQuantity}>
                        <p>Please enter quantity</p>
                      </div> */}
                    </form>
                    <span>
                      <button
                        className="checkout btn"
                        onClick={() => this.handleFormSubmit(product.data._id)}
                      >
                        Update
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        < Footer />
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  console.log(auth)

  return { auth };
}
export default connect(
  mapStateToProps,
  actions
)(ManageInventory);
