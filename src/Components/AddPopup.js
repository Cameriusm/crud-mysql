import "../App.css";
import { useState } from "react";
import Axios from "axios";

function Popup(props) {
  const inputRowDate = Object.entries(props.infoState[0][0]);
  const [inputRows, setInputRows] = useState(inputRowDate);

  const addHandler = () => {
    Axios.post(`http://localhost:3001/addInfo/`, {
      data: inputRows,
      tableName: props.text,
    })
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        props.addInfo(inputRows);
        props.closePopup();
      })
      .catch((error) => {
        alert("Ошибка операции: " + error);
        console.log(error);
      });
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
            <h1>Добавление данных в таблице - {props.text}</h1>
            <div className="input-fields">
              {inputRows.map((header) => {
                return (
                  <div>
                    <div className="update-header-labels">
                      <label>{header[0]}</label>
                    </div>
                    <input name={header[0]} onChange={(e) => updateInput(e)} />
                  </div>
                );
              })}
            </div>
            <div>
              <div className="update-popup-button">
                <button onClick={() => addHandler()}>Добавить</button>
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
