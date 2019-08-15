import { Component } from "react";

export default class oAuth extends Component {
  componentDidMount(){
    this.startParsingAndSettingToCookies(this.props);
  };
  startParsingAndSettingToCookies = props => {
    try{//if params in url are not valid
      const parsedParams = this.parseParams(props.match.params.info);
      const {
        accessToken,
        expiresIn,
        userID,
        accessTokenStart
      } = parsedParams;
      props.cookies.set("accessToken", accessToken);
      props.cookies.set("expiresIn", expiresIn);
      props.cookies.set("userID", userID);
      props.cookies.set("accessTokenStart", accessTokenStart);
      props.processReceivedAccessData(parsedParams);
    }
    catch{
      props.onAuthError();
    }
  }
  
  parseParams = paramsString => {
    const params = paramsString.split("&");
    const accessToken = params[0].substring(13);
    const expiresIn = params[1].substring(11)*1000;
    const userID = params[2].substring(8);
    const accessTokenStart = new Date().getTime();
    return {
      accessToken,
      expiresIn,
      userID,
      accessTokenStart
    };
  };
  render(){
    return null;
  };
};