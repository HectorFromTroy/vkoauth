import React from "react";

const Welcome = props => {
  //because if leave it with /#/ then vk api will MAYBE think that 
  //i'm trying to access via server and will send me code instead of access tokken
  const CURRENT_LOCATION = window.location.href.substring(0, window.location.href.length - 3);
  return (
    <div className="welcome">
      <h1>Добро пожаловать</h1>
      <a className="authorizationButton" href={`https://oauth.vk.com/authorize?client_id=${props.APP_ID}&display=page&redirect_uri=${CURRENT_LOCATION}&scope=friends&response_type=token&v=${props.API_VERSION}`}>
        Авторизоваться
      </a>
    </div>
  );
};

export default Welcome;