const express = require("express");
const fs = require("fs");
const { customerSchema } = require("../validation/customer");
const router = express.Router();
const filePath = "./data/customers.json";

const getData = () => JSON.parse(fs.readFileSync(filePath));
const saveData = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - customerNumber
 *         - customerName
 *         - contactLastName
 *         - contactFirstName
 *         - phone
 *         - addressLine1
 *         - city
 *         - country
 *         - salesRepEmployeeNumber
 *       properties:
 *         customerNumber:
 *           type: integer
 *           description: The customer number
 *         customerName:
 *           type: string
 *           description: The name of the customer
 *         contactLastName:
 *           type: string
 *           description: The last name of the contact
 *         contactFirstName:
 *           type: string
 *           description: The first name of the contact
 *         phone:
 *           type: string
 *           description: The phone number of the contact
 *         addressLine1:
 *           type: string
 *           description: The address line 1 of the customer
 *         addressLine2:
 *           type: string
 *           description: The address line 2 of the customer
 *         city:
 *           type: string
 *           description: The city of the customer
 *         state:
 *           type: string
 *           description: The state of the customer
 *         postalCode:
 *           type: string
 *           description: The postal code of the customer
 *         country:
 *           type: string
 *           description: The country of the customer
 *         salesRepEmployeeNumber:
 *           type: integer
 *           description: The sales representative employee number
 *         creditLimit:
 *           type: number
 *           description: The credit limit of the customer
 */

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: The customers managing API
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Returns the list of all the customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: The list of the customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
router.get("/", (req, res) => {
  const data = getData();
  res.json(data);
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get the customer by id
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer id
 *     responses:
 *       200:
 *         description: The customer description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: The customer was not found
 */
router.get("/:id", (req, res) => {
  const data = getData();
  const customer = data.find((cust) => cust.customerNumber === req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).send("Customer not found");
  }
});

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: The customer was successfully created
 *       400:
 *         description: Invalid data
 */
router.post("/", customerSchema, (req, res) => {
  const data = getData();
  const newCustomer = req.body;
  data.push(newCustomer);
  saveData(data);
  res.status(201).send("Customer added");
});

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update the customer by the id
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: The customer was updated
 *       404:
 *         description: The customer was not found
 *       400:
 *         description: Invalid data
 */
router.put("/:id", customerSchema, (req, res) => {
  const data = getData();
  const index = data.findIndex((cust) => cust.customerNumber === req.params.id);
  if (index !== -1) {
    data[index] = req.body;
    saveData(data);
    res.send("Customer updated");
  } else {
    res.status(404).send("Customer not found");
  }
});

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Remove the customer by id
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer id
 *     responses:
 *       200:
 *         description: The customer was deleted
 *       404:
 *         description: The customer was not found
 */
router.delete("/:id", (req, res) => {
  const data = getData();
  const newData = data.filter((cust) => cust.customerNumber !== req.params.id);
  if (data.length !== newData.length) {
    saveData(newData);
    res.send("Customer deleted");
  } else {
    res.status(404).send("Customer not found");
  }
});

module.exports = router;
