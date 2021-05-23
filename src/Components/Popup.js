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
  console.log(props.date);
  const deleteHandler = (e) => {
    const deleteId = e.target.attributes.value.value;

    Axios.delete(`http://localhost:3001/delete/${deleteId}`, {
      data: {
        tableName: props.text,
      },
    })
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        if (result) {
          console.log("done");
          console.log(deleteId)
          if(props.date[0].length === 1) {
            props.closePopup()
          }
          // if (props.date.length)
          props.deleteInfo(deleteId)
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

  return (
    <div className="popup">
      <div className="popup_inner">
        <div className="information-table">
        <div className="information-table-inside">
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
             
              const tableRowValues = Object.values(elem);
              const elemId = Object.values(elem)[0]
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
                    onClick={(e) => deleteHandler(e)}
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
      </div>
      {updatePopup ? (
        <UpdatePopup
          text={props.text}
          closePopup={toggleShowUpdatePopup}
          updId={updateId}
          infoState={props.date}
          updateInfo = {props.updateInfo}
          
        />
      ) : null}
    </div>
  );
}

export default Popup;
