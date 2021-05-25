import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  const { currentUser } = useAuth();
  // console.log(currentUser);
  return (
    <div className="navbars">
      {!currentUser ? (
        <div className="navButtons">
          <Link to="/signup">
            <button className="btn btn-success float-right">Регистрация</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-success float-right ">Войти</button>
          </Link>
        </div>
      ) : (
        <div className="navButtons">
          <Link to="/profile">
            <button className="btn btn-success float-right">Профиль</button>
          </Link>
          <Link to="/">
            <button className="btn btn-success float-right">Просмотр</button>
          </Link>
        </div>
      )}
    </div>
  );
}
