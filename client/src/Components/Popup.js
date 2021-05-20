import "../App.css";
import { useState } from "react";
import Axios from "axios";
import UpdatePopup from "./UpdatePopup";

function Popup(props) {
  const [updatePopup, setUpdatePopup] = useState(false);

  const tableHeaders = Object.keys(props.date[0][0]);
  const tableValues = Object.values(props.date[0]);
  const [updateId, setUpdateId] = useState(0);
  let updId = 0;

  const deleteHandler = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`, {
      data: {
        tableName: props.text,
      },
    })
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        if (result) {
          console.log("done");
        } else {
          alert("Ошибка операции" + result[1]);
        }
      })
      .catch((error) => {
        alert("Ошибка операции: " + error);
        console.log(error);
      });
  };

  const toggleShowUpdatePopup = () => {
    setUpdatePopup(!updatePopup);
  };

  const setUpdate = (e) => {
    updId = e.target.attributes.value.value;
    setUpdateId(updId);
    toggleShowUpdatePopup();
  };

  let elemId = 0;

  return (
    <div className="popup">
      <div className="popup_inner">
        <div className="information-table">
          <h1>Table - {props.text}</h1>
          <table>
            <tr>
              {tableHeaders.map((e) => {
                return <th>{e}</th>;
              })}
              <td className="delete-button-header">Обновить</td>
              <td className="delete-button-header">Удалить</td>
            </tr>
            {tableValues.map((elem) => {
              elemId++;
              const tableRowValues = Object.values(elem);
              return (
                <tr>
                  {tableRowValues.map((e) => {
                    return <td>{e}</td>;
                  })}

                  <td
                    className="update-button"
                    value={elemId}
                    onClick={(e) => setUpdate(e)}
                  >
                    Обновить
                  </td>
                  <td
                    className="delete-button"
                    value={elemId}
                    onClick={() => deleteHandler(elemId)}
                  >
                    Удалить
                  </td>
                </tr>
              );
            })}
          </table>
          <div className="close-button">
            <button onClick={props.closePopup}>Закрыть</button>
          </div>
        </div>
      </div>
      {updatePopup ? (
        <UpdatePopup
          text={props.text}
          closePopup={toggleShowUpdatePopup}
          updId={updateId}
          infoState={props.date}
        />
      ) : null}
    </div>
  );
}

export default Popup;
