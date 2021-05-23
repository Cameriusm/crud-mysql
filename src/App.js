import "./App.css";

import Table from "./Components/Table.js";

function App() {
  return (
    <div className="App">
      <div className="tables">
        <Table name={"category"} />
        <Table name={"courier"} />
        <Table name={"customers"} />
        <Table name={"delivery_list"} />
        <Table name={"orders"} />
        <Table name={"orders_products"} />
        <Table name={"products"} />
      </div>
    </div>
  );
}

export default App;
