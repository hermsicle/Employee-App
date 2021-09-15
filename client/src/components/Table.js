import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { EmployeeContext } from "../context/EmployeeContext";
import { Table } from "react-bootstrap";
import TableRow from "./TableRow";

const MyTable = () => {
  const { employees } = useContext(EmployeeContext);

  return (
    <div className="table-container">
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th> # </th>
            <th> Name</th>
            <th> Age</th>
            <th> Email</th>
            <th> Role </th>
            <th> Edit </th>
            <th> Delete </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, i) => {
            let index = i + 1;
            return (
              <TableRow
                index={index}
                id={employee._id}
                eName={employee.name}
                eAge={employee.age}
                eEmail={employee.address}
                eRole={employee.role}
                key={employee._id}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default MyTable;
