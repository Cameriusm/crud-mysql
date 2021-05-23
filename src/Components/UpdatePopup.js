import "../App.css";
import { useState } from "react";
import Axios from "axios";

function Popup(props) {
  const updateHeader = Object.entries(props.infoState[0][props.updId - 1]);
  const [inputRows, setInputRows] = useState(updateHeader);

  console.log(props.infoState)
  console.log(inputRows);
  const updateHandler = () => {
    Axios.put(`http://localhost:3001/update/`, {
      data: inputRows,
      tableName: props.text
    })
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        props.updateInfo(inputRows)
        props.closePopup()
      })
      .catch((error) => {
        alert("Ошибка операции: " + error);
        console.log(error);
      })
  };

  const updateInput = (e) => {
    let elemId = 0;
    const inputVal = e.target.value;
    const inputName = e.target.name;
    console.log(inputVal, inputName);
    const updateArray = inputRows;
    inputRows.map((e, ind) => (e.includes(inputName) ? (elemId = ind) : null));
    updateArray[elemId][1] = inputVal;
    setInputRows([...updateArray]);
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <div className="information-table">
        <div className="information-table-update-inside">
          <h1>Обновление данных в таблице - {props.text}</h1>
          <div className="input-fields">
            {inputRows.map((header) => {
              return (
                <div>
                  <div className="update-header-labels">
                    <label>{header[0]}</label>
                  </div>
                  <input
                    name={header[0]}
                    value={header[1]}
                    onChange={(e) => updateInput(e)}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <div className="update-popup-button">
              <button onClick={() => updateHandler()}>Обновить</button>
            </div>
            <div className="close-button">
              <button onClick={props.closePopup}>Закрыть</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
