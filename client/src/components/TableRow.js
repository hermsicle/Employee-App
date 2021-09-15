import React, { useState, useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import axios from "axios";

const TableRow = ({ index, id, eName, eAge, eEmail, eRole }) => {
  const { setIsDeleted, setIsUpdated } = useContext(EmployeeContext);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(eName);
  const [age, setAge] = useState(eAge);
  const [email, setEmail] = useState(eEmail);
  const [role, setRole] = useState(eRole);
  const [error, setError] = useState({});

  const handleDelete = () => {
    console.log(id);
    axios
      .delete(`/api/employees/${id}`)
      .then(() => {
        console.log("success");
        setIsDeleted(true);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    console.log(id);
    setIsEdit(true);
  };

  const handleFormErrors = () => {
    // Destructuring our keys from our formInputs { }
    const newErrors = {};

    if (!name || name === "") {
      newErrors.name = "Cannot be blank";
    } else if (name.length >= 30) newErrors.name = "Name is too long!";

    if (!age || age === "") {
      newErrors.age = "Please fill out age";
    } else if (age < 18 || age > 99) {
      newErrors.age = "Age requirements is 18 - 99";
    }

    if (!email || email === "") {
      newErrors.email = "Cannot be blank";
    } else if (!email.includes("@") || !email.includes(".com")) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!role || role === "") {
      newErrors.role = "Please fill out employee role";
    } else if (role.length > 30) {
      newErrors.role = "Role is too long!";
    }

    return newErrors;
  };

  const handleSaveEdit = () => {
    // Check validations on name, age, role, address
    const newErrors = handleFormErrors();
    console.log(newErrors); // Should return an empty object if NO errors
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
    } else {
      setIsEdit(false);
      // Do Put request here
      axios
        .put(`/api/employees/${id}`, {
          name: name,
          age: age,
          address: email,
          role: role,
        })
        .then(() => {
          console.log("success");
          setIsUpdated(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <tr>
      <td>{index}</td>
      <td>
        {isEdit ? (
          <>
            <input
              className="edit-input"
              placeholder={name}
              value={name}
              onChange={(e) => {
                if (error["name"]) {
                  setError({
                    ...error,
                    name: "",
                  });
                }
                setName(e.target.value);
              }}
            />
            {error.name && <p className="error-message"> {error.name} </p>}
          </>
        ) : (
          eName
        )}
      </td>
      <td>
        {isEdit ? (
          <>
            <input
              className="edit-input"
              placeholder={age}
              value={age}
              onChange={(e) => {
                if (error["age"]) {
                  setError({
                    ...error,
                    age: "",
                  });
                }
                setAge(e.target.value);
              }}
            />
            {error.age && <p className="error-message"> {error.age} </p>}
          </>
        ) : (
          eAge
        )}
      </td>
      <td>
        {isEdit ? (
          <>
            <input
              className="edit-input"
              placeholder={email}
              value={email}
              onChange={(e) => {
                if (error["email"]) {
                  setError({
                    ...error,
                    email: "",
                  });
                }
                setEmail(e.target.value);
              }}
            />
            {error.email && <p className="error-message">{error.email}</p>}
          </>
        ) : (
          eEmail
        )}
      </td>
      <td>
        {isEdit ? (
          <>
            <input
              className="edit-input"
              placeholder={role}
              value={role}
              onChange={(e) => {
                if (error["role"]) {
                  setError({
                    ...error,
                    role: "",
                  });
                }
                setRole(e.target.value);
              }}
            />
            {error.role && <p className="error-message"> {error.role} </p>}
          </>
        ) : (
          eRole
        )}
      </td>
      <td>
        {isEdit ? (
          <button onClick={handleSaveEdit} className="my-btn">
            ✔️
          </button>
        ) : (
          <button onClick={handleEdit} className="my-btn">
            ✏️
          </button>
        )}
      </td>
      <td>
        <button onClick={handleDelete} className="my-btn">
          ❌
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
