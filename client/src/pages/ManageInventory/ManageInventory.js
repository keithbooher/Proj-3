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

class ManageInventory extends Component {
  // contructor(props) {
  //  super(props)

  // }

  state = {
    user: {},
    productIDs: [],
    products: [],
    currentUser: {},
    value: [],
    quantity: 0,
    toDashboard: false
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadCurrentUser();
  }

  //  Function to handle form input
  handleInputChange = event => {
    console.log(this.state);
    // console.log(`i: ${i}`);
    console.log("event", event);
    const target = event.target;
    const name = target.name;
    const value = target.value;
    // let tempVar = this.state.value;
    // tempVar[i] = event.target.value;
    // this.setState({ value: tempVar });
    this.setState({ [name]: value });
  };

  handleFormSubmit = id => {
    console.log("value", this.state.value);
    console.log("id", id);
    const value = this.state[id];
    console.log("value: ", value);
    const newQuantity = {
      quantity: value
    };

    console.log("id", id);

    if (value < 1) {
      API.updateSoldTrue(id).then(result => {
        console.log("SOLD", result);
      });
    } else {
      API.updateSold(id).then(result => {
        console.log("SOLD", result);
      });
    }

    API.updateQuantity(id, newQuantity)
      .then(dbModel => this.setState({ toDashboard: true }))
      .catch(err => console.log(err));
  };

  loadProductIds = () => {
    const userProducts = this.state.currentUser.product;
    const userProductsArray = [];
    for (let i = 0; i < userProducts.length; i++) {
      userProductsArray.push(userProducts[i]);
    }
    console.log("userProductsArray", userProductsArray);
    this.setState({
      productIDs: userProductsArray,
      quantity: this.state.currentUser.quantity
    });
    this.loadUsersProducts();
  };

  loadUsersProducts = () => {
    const productIDs = this.state.productIDs;
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
    console.log("productIDs", this.state.productIDs);
    console.log("products", this.state.products);
  };

  loadCurrentUser = () => {
    fetch("/api/current_user")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            currentUser: result
          });
          console.log("current user: ", this.state.currentUser);
          this.loadProductIds();
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
        {this.state.currentUser.admin ? (
          <AdminHeader amount={this.state.amount} />
        ) : (
          <Header key="1" amount={this.state.amount} />
        )}
        <SideBar user={this.state.user} />

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
                      ${product.data.price + product.data.platformFee}
                    </p>
                    <p className="card-text">{product.data.description}</p>
                    <form className="manageForm">
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
        < Footer/>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(ManageInventory);
