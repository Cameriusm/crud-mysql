import "../App.css";
import { useState } from "react";
import Axios from "axios";
import Popup from "./Popup";

function Table(props) {
  const [info, setInfo] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  const getHandler = () => {
    Axios.post("http://localhost:3001/getInfo", {
      tableName: props.name,
    })
      .then((response) => response.data)
      .then((result) => {
        console.log(result);

        if (result && result.length > 0) {
          console.log(result);
          setInfo([result]);
          toggleShowPopup();
        } else {
          alert("Таблица не имеет данных");
        }
      })
      .catch((error) => {
        alert("Ошибка получения данных");
        console.log("error", error);
      });
  };

  const toggleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <div className="table-block">
        <p>{props.name}</p>
        <div className="action-field">
          <button onClick={() => getHandler()}>Просмотреть</button>
          <button onClick={() => getHandler()}>Добавить</button>
        </div>
      </div>
      {showPopup ? (
        <Popup text={props.name} closePopup={toggleShowPopup} date={info} />
      ) : null}
    </div>
  );
}

export default Table;
