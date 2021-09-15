import "./App.scss";
import { MyForm, MyTable } from "./components/";

const App = () => {
  return (
    <div className="App">
      <h1 className="title">Add Employee</h1>
      <MyForm />
      <h1 className="title">All Employees</h1>
      <MyTable />
    </div>
  );
};

export default App;
