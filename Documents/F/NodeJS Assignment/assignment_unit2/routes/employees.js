const express = require("express");
const fs = require("fs");
const { employeeSchema } = require("../validation/employee");
const router = express.Router();
const filePath = "./data/employees.json";

const getData = () => JSON.parse(fs.readFileSync(filePath));
const saveData = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - employeeNumber
 *         - lastName
 *         - firstName
 *         - extension
 *         - email
 *         - officeCode
 *         - jobTitle
 *       properties:
 *         employeeNumber:
 *           type: integer
 *           description: The employee number
 *         lastName:
 *           type: string
 *           description: The last name of the employee
 *         firstName:
 *           type: string
 *           description: The first name of the employee
 *         extension:
 *           type: string
 *           description: The extension of the employee
 *         email:
 *           type: string
 *           description: The email of the employee
 *         officeCode:
 *           type: string
 *           description: The office code of the employee
 *         reportsTo:
 *           type: integer
 *           description: The employee number of the employee's manager
 *         jobTitle:
 *           type: string
 *           description: The job title of the employee
 */

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: The employees managing API
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Returns the list of all the employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: The list of the employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/", (req, res) => {
  const data = getData();
  res.json(data);
});

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get the employee by id
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The employee id
 *     responses:
 *       200:
 *         description: The employee description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: The employee was not found
 */
router.get("/:id", (req, res) => {
  const data = getData();
  const employee = data.find((emp) => emp.employeeNumber === req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: The employee was successfully created
 *       400:
 *         description: Invalid data
 */
router.post("/", employeeSchema, (req, res) => {
  const data = getData();
  const newEmployee = req.body;
  data.push(newEmployee);
  saveData(data);
  res.status(201).send("Employee added");
});

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update the employee by the id
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The employee id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: The employee was updated
 *       404:
 *         description: The employee was not found
 *       400:
 *         description: Invalid data
 */
router.put("/:id", employeeSchema, (req, res) => {
  const data = getData();
  const index = data.findIndex((emp) => emp.employeeNumber === req.params.id);
  if (index !== -1) {
    data[index] = req.body;
    saveData(data);
    res.send("Employee updated");
  } else {
    res.status(404).send("Employee not found");
  }
});

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Remove the employee by id
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The employee id
 *     responses:
 *       200:
 *         description: The employee was deleted
 *       404:
 *         description: The employee was not found
 */
router.delete("/:id", (req, res) => {
  const data = getData();
  const newData = data.filter((emp) => emp.employeeNumber !== req.params.id);
  if (data.length !== newData.length) {
    saveData(newData);
    res.send("Employee deleted");
  } else {
    res.status(404).send("Employee not found");
  }
});

module.exports = router;
