import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Welcome from "./components/Welcome.jsx";
import OAuth from "./components/OAuth.jsx";
import AuthError from "./components/AuthError.jsx";
import Profile from "./components/Profile.jsx";
import { getProfileAndFriendsInfo } from "./VK_API.requests.jsx";
import { mainRoute, withParamsRoute, profileRoute, authenticationError } from "./routes.jsx";

const cookies = new Cookies();

const APP_ID = "7094008";
const API_VERSION = "5.101";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      didAccessDataAvailable: false,
      authError: {
        isAuthError: false,
        message: ""
      },
      authorizationInfo: this.checkAuthorization(cookies.getAll()),
      mainProfileInfo: {
        first_name: "",
        last_name: "",
        photo_100: "" 
      },
      friendsInfo: []
    };
  };

  checkAuthorization = ({ userID, accessToken, accessTokenStart, expiresIn }) => {
    if(
      this.isAllAuthDataOK(userID, accessToken, accessTokenStart, expiresIn) &&
      this.isAccessTokenValid(accessTokenStart, expiresIn)
    ){
      return {
        isAuthorized: true,
        userID,
        accessToken,
        accessTokenStart,
        expiresIn
      };
    }
    else{
      return {
        isAuthorized: false
      }
    }
  };
  
  isAllAuthDataOK = (userID, accessToken, accessTokenStart, expiresIn) => {
    return userID && accessToken && accessTokenStart && expiresIn;
  };
  
  isAccessTokenValid = (accessTokenStart, expiresIn) => new Date().getTime() < accessTokenStart + expiresIn;

  processReceivedAccessData = (accessData) => {
    this.setState({
      didAccessDataAvailable: true,
      authorizationInfo: {
        isAuthorized: true,
        ...accessData
      }
    });
  };

  getProfileInfo = async () => {
    const { data } = await getProfileAndFriendsInfo(this.state.authorizationInfo, API_VERSION);
    let { 
      first_name,
      last_name,
      photo_100  
    } = data.response.profileInfo[0];
    const friendsInfo = getFriendsInfo();
    this.setState({
      mainProfileInfo: {
        first_name,
        last_name,
        photo_100
      },
      friendsInfo
    });

    function getFriendsInfo(){
      const result = [];
      const friends = data.response.friendsInfo.items;
      for(let i = 0; i < friends.length; i++){
        const {
          first_name,
          last_name,
          photo_100
        } = friends[i];
        result.push({
          first_name,
          last_name,
          photo_100
        });
      }
      return result;
    };
  };

  onAuthError = () => {
    this.setState({
      authError:{
        isAuthError: true
      }
    });
  };

  render(){
    return (
      <main className="app">
        <Switch>
          <Route exact path={mainRoute} render={
            props => (
              this.state.authorizationInfo.isAuthorized ?
              <Redirect to={profileRoute} />
              :
              <Welcome
                APP_ID={APP_ID}
                API_VERSION={API_VERSION}
              />
            )
          } />

          <Route path={profileRoute} render={
            props => (
              this.state.authorizationInfo.isAuthorized ?//checking again because user can go to "/profile" directly from browser
              <Profile 
                {...props}
                profileInfo={this.state.mainProfileInfo}
                friendsInfo={this.state.friendsInfo}
                getProfileInfo={this.getProfileInfo}
              />
              :
              <AuthError
                message="Авторизационные данные не предоставлены либо срок их действия истек."
              />
            )
          } />

          <Route path={authenticationError} render={
            () => (
              <AuthError
                message="Ошибка авторизации."
              />
            )
          } />

          <Route path={withParamsRoute} render={
            props => (
              this.state.didAccessDataAvailable ?
              <Redirect to={profileRoute} />
              :
              !this.state.authError.isAuthError ?
              <OAuth 
                {...props}
                cookies={cookies}
                processReceivedAccessData={this.processReceivedAccessData}
                onAuthError={this.onAuthError}
              />
              :
              <Redirect to={authenticationError} />
            )
          } />
        </Switch>
      </main>
    );
  };
};

export default App;
