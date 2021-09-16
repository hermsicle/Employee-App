import axios from "axios";
import { createContext, useState, useEffect } from "react";

const EmployeeContext = createContext();

const EmployeeContextProvider = ({ children }) => {
  const [newEmployee, setNewEmployee] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const getAllEmployees = () => {
    // Get all employees from db
    axios.get("/api/employees").then((res) => {
      console.log(res.data);
      setEmployees(res.data);
    });
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  useEffect(() => {
    getAllEmployees();
    setIsDeleted(false);
  }, [isDeleted]);

  useEffect(() => {
    getAllEmployees();
    setIsUpdated(false);
  }, [isUpdated]);

  useEffect(() => {
    getAllEmployees();
    setNewEmployee(false);
  }, [newEmployee]);

  return (
    <EmployeeContext.Provider
      value={{
        newEmployee,
        setNewEmployee,
        employees,
        setEmployees,
        isDeleted,
        setIsDeleted,
        setIsUpdated,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContextProvider, EmployeeContext };
