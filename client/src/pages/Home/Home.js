import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import MissionStatement from "../../components/MissionStatement/missionStatement";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import HomeArt from "../../components/HomeArt/HomeArt";
import HomeArtLag from "../../components/HomeArt/HomeArtLag";

// import { Carousel } from '3d-react-carousal';

import "./Home.css";

class App extends Component {
  state = {
    amount: 0,
    carousel: [],
    carouselImageURLs: [],
    carouselImageProduct: [],
    carouselImageArtist: [],
    carouselArtistIDs: [],
    user: {}
  };

  componentDidMount() {
    // this.loadProducts();
    this.props.fetchUser();
    this.loadCarouselProducts();
  }

  loadCarouselProducts = () => {
    API.getCarouselProduct()
      .then(res => {
        this.setState({ carousel: res.data });
        this.getURLS();
      })
      .catch(err => console.log(err));
  };

  getURLS = () => {
    const carouselObjects = this.state.carousel;
    for (let i = 0; i < carouselObjects.length; i++) {
      console.log("images", carouselObjects[i].img);
      this.setState({
        carouselImageURLs: this.state.carouselImageURLs.concat(
          carouselObjects[i].img
        )
      });
      console.log("*****LOOK HERE**********", this.state.carouselImageURLs);
    }

    this.getProducts();

    this.loadCurrentUser();
  };

  getProducts = () => {
    const carouselObjects = this.state.carousel;

    for (let i = 0; i < carouselObjects.length; i++) {
      console.log("product Name", carouselObjects[i].productName);
      this.setState({
        carouselImageProduct: this.state.carouselImageProduct.concat(
          carouselObjects[i].productName
        )
      });
      console.log("*****LOOK HERE**********", this.state.carouselImageProduct);
    }
    this.getArtists();
  };

  getArtists = () => {
    const carouselObjects = this.state.carousel;

    for (let i = 0; i < carouselObjects.length; i++) {
      console.log("artist Name", carouselObjects[i].artistName);
      this.setState({
        carouselImageArtist: this.state.carouselImageArtist.concat(
          carouselObjects[i].artistName
        )
      });
      console.log("*****LOOK HERE**********", this.state.carouselImageArtist);
    }
    this.getArtistIDs();
  };

  getArtistIDs = () => {
    const carouselObjects = this.state.carousel;

    for (let i = 0; i < carouselObjects.length; i++) {
      console.log("artist Name", carouselObjects[i].associatedID);
      this.setState({
        carouselArtistIDs: this.state.carouselArtistIDs.concat(
          carouselObjects[i].associatedID
        )
      });
      console.log("*****LOOK HERE**********", this.state.carouselArtistIDs);
    }

  };

  // slides = () => {
  //   let urls = this.state.carouselImageURLs
  //   console.log(urls)

  //   let slides = [
  //     <img className="carouselImage" src={urls[0]} alt="1" />,
  //     <img className="carouselImage" src={urls[1]} alt="2" />,
  //     <img className="carouselImage" src={urls[2]} alt="3" />,
  //     <img className="carouselImage" src={urls[3]} alt="4" />,
  //     <img className="carouselImage" src={urls[4]} alt="5" />,
  //     <img className="carouselImage" src={urls[5]} alt="6" />
  //   ];

  //   return slides
  // }

  loadCurrentUser = () => {
    fetch("/api/current_user")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            user: result
          });

          // console.log('result', result)
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


  render() {
    return (
      <div className="homeGrid">
        {this.state.user.admin ? (
          <AdminHeader amount={this.state.amount} />
        ) : (
            <Header key="1" amount={this.state.amount} />
          )}
        {this.state.carouselArtistIDs ? (
          // <div className="carouselStuff">
          //   <Carousel slides={this.slides()} />
          // </div>

          <HomeArt
            imagePlaceholder={this.state.imagePlaceholder}
            firstImage={this.state.carouselImageURLs[0]}
            secondImage={this.state.carouselImageURLs[1]}
            thirdImage={this.state.carouselImageURLs[2]}
            fourthImage={this.state.carouselImageURLs[3]}
            fifthImage={this.state.carouselImageURLs[4]}
            sixthImage={this.state.carouselImageURLs[5]}
            ///////////////////////////////////////////////
            firstProductName={this.state.carouselImageProduct[0]}
            secondProductName={this.state.carouselImageProduct[1]}
            thirdProductName={this.state.carouselImageProduct[2]}
            fourthProductName={this.state.carouselImageProduct[3]}
            fifthProductName={this.state.carouselImageProduct[4]}
            sixthProductName={this.state.carouselImageProduct[5]}
            ///////////////////////////////////////////////
            firstArtistName={this.state.carouselImageArtist[0]}
            secondArtistName={this.state.carouselImageArtist[1]}
            thirdArtistName={this.state.carouselImageArtist[2]}
            fourthArtistName={this.state.carouselImageArtist[3]}
            fifthArtistName={this.state.carouselImageArtist[4]}
            sixthArtistName={this.state.carouselImageArtist[5]}
            ///////////////////////////////////////////////
            firstArtistIDs={this.state.carouselArtistIDs[0]}
            secondArtistIDs={this.state.carouselArtistIDs[1]}
            thirdArtistIDs={this.state.carouselArtistIDs[2]}
            fourthArtistIDs={this.state.carouselArtistIDs[3]}
            fifthArtistIDs={this.state.carouselArtistIDs[4]}
            sixthArtistIDs={this.state.carouselArtistIDs[5]}
          />

          /* <HomeArtLag
            imagePlaceholder={this.state.imagePlaceholder}
            firstImage={this.state.carouselImageURLs[0]}
            secondImage={this.state.carouselImageURLs[1]}
            thirdImage={this.state.carouselImageURLs[2]}
            fourthImage={this.state.carouselImageURLs[3]}
            fifthImage={this.state.carouselImageURLs[4]}
            sixthImage={this.state.carouselImageURLs[5]}
            ///////////////////////////////////////////////
            firstProductName={this.state.carouselImageProduct[0]}
            secondProductName={this.state.carouselImageProduct[1]}
            thirdProductName={this.state.carouselImageProduct[2]}
            fourthProductName={this.state.carouselImageProduct[3]}
            fifthProductName={this.state.carouselImageProduct[4]}
            sixthProductName={this.state.carouselImageProduct[5]}
            ///////////////////////////////////////////////
            firstArtistName={this.state.carouselImageArtist[0]}
            secondArtistName={this.state.carouselImageArtist[1]}
            thirdArtistName={this.state.carouselImageArtist[2]}
            fourthArtistName={this.state.carouselImageArtist[3]}
            fifthArtistName={this.state.carouselImageArtist[4]}
            sixthArtistName={this.state.carouselImageArtist[5]}
            ///////////////////////////////////////////////
            firstArtistIDs={this.state.carouselArtistIDs[0]}
            secondArtistIDs={this.state.carouselArtistIDs[1]}
            thirdArtistIDs={this.state.carouselArtistIDs[2]}
            fourthArtistIDs={this.state.carouselArtistIDs[3]}
            fifthArtistIDs={this.state.carouselArtistIDs[4]}
            sixthArtistIDs={this.state.carouselArtistIDs[5]}
          /> */

        ) : (
            ""
          )}
        <SideBar user={this.state.user} />
        <MissionStatement />
        {/* <HomeArt
          imagePlaceholder={this.state.imagePlaceholder}
          // firstImage={this.state.carousel[0].img}
          // secondImage={this.state.carousel[1].img}
          // thirdImage={this.state.carousel[2].img}
          // fourthImage={this.state.carousel[3].img}
          // fifthImage={this.state.carousel[4].img}
          // sixthImage={this.state.carousel[5].img}
        /> */}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
