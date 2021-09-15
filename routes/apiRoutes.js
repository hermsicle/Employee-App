const express = require("express");
const router = express.Router();
const { EmployeeSchema } = require("../model");

// Get all the employees
router.get("/employees", (req, res) => {
  EmployeeSchema.find()
    .then((emp) => {
      res.json(emp);
    })
    .catch((err) => res.send(err));
});

// Add an employee
router.post("/employees", (req, res) => {
  EmployeeSchema.create({
    name: req.body.name,
    address: req.body.address,
    role: req.body.role,
    age: req.body.age,
  })
    .then((newEmp) => {
      console.log(newEmp);
      res.json(newEmp);
    })
    .catch((err) => res.json(err));
});

// Update an employee
router.put("/employees/:id", (req, res) => {
  // console.log(req.body);
  EmployeeSchema.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    () => {
      EmployeeSchema.updateOne({ _id: req.params.id })
        .then((updatedEmployee) => res.json(updatedEmployee))
        .catch((err) => res.send(err));
    }
  );
});

// Delete an employee
router.delete("/employees/:id", (req, res) => {
  EmployeeSchema.deleteOne({ _id: req.params.id })
    .then((res) => res.send("success"))
    .catch((err) => res.send(err));
});

module.exports = router;
