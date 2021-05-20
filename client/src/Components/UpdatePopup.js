import "../App.css";
import { useState } from "react";
import Axios from "axios";

function Popup(props) {
  console.log(props);
  console.log(props.infoState[0]);
  const updateHeader = Object.keys(props.infoState[0][props.updId]);
  const updateRow = props.infoState[0][props.updId];
  const [inputRows, setInputRows] = useState(updateHeader);

  console.log(inputRows);
  const updateHandler = (id) => {
    Axios.post(`http://localhost:3001/update/${id}`, {
      tableName: props.text,
    })
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
      });
  };

  const updateInput = () => {
    inputRows;
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <div className="information-table">
          <h1>Обновление данных в таблице - {props.text}</h1>
          <div className="input-fields">
            {inputRows.map((header) => {
              return (
                <div>
                  <div className="update-header-labels">
                    <label>{header}</label>
                  </div>
                  <input
                    value={updateRow[header]}
                    onChange={() => updateInput()}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <div className="update-popup-button">
              <button onClick={() => updateHandler(props.data)}>
                Обновить
              </button>
            </div>
            <div className="close-button">
              <button onClick={props.closePopup}>Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
