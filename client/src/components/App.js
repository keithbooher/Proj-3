import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';
import API from "../utils/API";

import Header from './Navs/Header';
<<<<<<< HEAD
import Landing from './Landing';
import Gallery from './Gallery';
const Dashboard = () => <h2>Dashboard</h2>

class App extends Component {
    state = {
        amount: 0,
        products: [],
        user: {}
    }

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
            (result) => {
                console.log('result',result)
            this.setState({
                isLoaded: true,
                user: result
            });    

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


    clicked = (name) => {
        console.log('test')
        console.log('name', name) // trying to return the name of the product name
        
        const updatedAmount = this.state.amount + 1
        this.setState({ amount:updatedAmount})
    }
 

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header 
                            key="1"
                            amount={this.state.amount}
                        />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route exact path="/gallery"  render={(routeProps) => (<Gallery clicked={this.clicked} />)} />
                    </div>
                </BrowserRouter>
=======
import Home from '../pages/Home'
import Gallery from './Gallery/Gallery';

const App = () => (
    <div className="container">
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/surveys" component={Home} />
                {/* <Route exact path="/gallery"  render={(routeProps) => (<Gallery clicked={this.clicked} />)} /> */}
>>>>>>> master
            </div>
        </BrowserRouter>
    </div>
)

export default App;