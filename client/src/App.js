import "./App.css";
import { useState } from "react";
import Table from "./Components/Table.js";

function App() {
  return (
    <div className="App">
      <div className="tables">
        <Table name={"Category"} />
        <Table name={"Курьер"} />
        <Table name={"Покупатели"} />
        <Table name={"Лист доставки"} />
        <Table name={"Заказы"} />
        <Table name={"Заказы-Продукты"} />
        <Table name={"Продукты"} />
      </div>
    </div>
  );
}

export default App;
