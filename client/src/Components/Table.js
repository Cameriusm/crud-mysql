import "../App.css";
import { useState } from "react";

function Table(props) {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      tableName: props.name,
    }),
  };

  const [info, setInfo] = useState([]);
  const getHandler = () => {
    fetch("http://localhost:3001/getInfo", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // setInfo({ information: [...result] });
        // setInfo(...result.map((e) => e));
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <div className="table-block">
        <p>{props.name}</p>
        <div className="action-field">
          <button onClick={() => getHandler()}>Просмотреть</button>
          <button>Добавить</button>
          <button>Обновить</button>
          <button>Удалить</button>
        </div>
        // {info}
      </div>
    </div>
  );
}

export default Table;
