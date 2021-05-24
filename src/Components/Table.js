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
        if (result && result.length > 0) {
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

  const deleteInfo = (id) => {
    const deleteArray = info[0].filter((elem) => {
      return Object.values(elem)[0] !== +id;
    });
    setInfo([deleteArray]);
  };

  const updateInfo = (data) => {
    const updateData = Object.fromEntries(data);
    const updateArray = info[0].map((elem) => {
      if (Object.values(elem)[0] === data[0][1]) {
        return updateData;
      }
      return elem;
    });
    setInfo([updateArray]);
  };

  const addInfo = (data) => {
    data[0][1] = +data[0][1];
    const updateData = Object.fromEntries(data);
    console.log([...info, updateData]);
    setInfo([[...info[0], updateData]]);
  };

  return (
    <div className="tables-blocks">
      <div className="table-block">
        <p>{props.name}</p>
        <div className="action-field">
          <button onClick={() => getHandler()}>Управление</button>
        </div>
      </div>
      {showPopup ? (
        <Popup
          text={props.name}
          closePopup={toggleShowPopup}
          date={info}
          deleteInfo={deleteInfo}
          updateInfo={updateInfo}
          addInfo={addInfo}
        />
      ) : null}
    </div>
  );
}

export default Table;
