import { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { EmployeeContext } from "../context/EmployeeContext";

const MyForm = () => {
  const { newEmployee, setNewEmployee } = useContext(EmployeeContext);
  const [formInputs, setFormInputs] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (key, value) => {
    setFormInputs({
      ...formInputs,
      [key]: value,
    });

    // Check to see if errors exists, if it does remove it
    if (!!errors[key]) {
      setErrors({
        ...errors,
        [key]: null,
      });
    }
  };

  const handleFormErrors = () => {
    // Destructuring our keys from our formInputs { }
    const { name, age, emailAddress, role } = formInputs;
    const newErrors = {};

    if (!name || name === "") {
      newErrors.name = "Cannot be blank";
    } else if (name.length >= 30) newErrors.name = "Name is too long!";

    if (!age || age === "") {
      newErrors.age = "Please fill out age";
    } else if (age < 18 || age > 99) {
      newErrors.age = "Age requirements is 18 - 99";
    }

    if (!emailAddress || emailAddress === "") {
      newErrors.emailAddress = "Cannot be blank";
    } else if (!emailAddress.includes("@") || !emailAddress.includes(".com")) {
      newErrors.emailAddress = "Please enter a valid email address";
    }

    if (!role || role === "") {
      newErrors.role = "Please fill out employee role";
    } else if (role.length > 30) {
      newErrors.role = "Role is too long!";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = handleFormErrors();

    console.log(newErrors);
    // Check if newErrors {} keys is a value greater than 0
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // Post form data to database
      axios
        .post("/api/employees", {
          name: formInputs.name,
          age: formInputs.age,
          address: formInputs.emailAddress,
          role: formInputs.role,
        })
        .then(() => {
          console.log("employee successfully added");
          // Reset the form inputs to ""
          e.target.reset();

          setFormInputs({
            name: "",
            age: "",
            emailAddress: "",
            role: "",
          });

          setNewEmployee(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Employee Name"
            onChange={(e) => setField("name", e.target.value)}
            isInvalid={errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="Enter Employee Age"
            onChange={(e) => setField("age", e.target.value)}
            isInvalid={errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter Employee Email"
            onChange={(e) => setField("emailAddress", e.target.value)}
            isInvalid={errors.emailAddress}
          />
          <Form.Control.Feedback type="invalid">
            {errors.emailAddress}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Employee Position"
            onChange={(e) => setField("role", e.target.value)}
            isInvalid={errors.role}
          />
          <Form.Control.Feedback type="invalid">
            {errors.role}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default MyForm;
