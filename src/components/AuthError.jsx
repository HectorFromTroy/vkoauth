import React from "react";
import { Link } from "react-router-dom";

const AuthError = props => {
  return (
    <main className="error">
      <h1>Ошибка авторизации</h1>
      <p>{props.message}</p> <Link to="/"> Нажмите для перехода на страницу авторизации.</Link>
    </main>
  );
};

export default AuthError;