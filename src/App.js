import "./App.css";

import Table from "./Components/Table.js";

function App() {
  return (
    <div className="App">
      <div className="tables-main">
        <div className="tables-main-divs">
          <Table name={"category"} />
          <Table name={"courier"} />
          <Table name={"customers"} />
          <Table name={"delivery_list"} />
        </div>
        <div className="tables-main-divs">
          <Table name={"orders"} />
          <Table name={"orders_products"} />
          <Table name={"products"} />
        </div>
      </div>
    </div>
  );
}

export default App;
