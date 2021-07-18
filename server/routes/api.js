const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost/clients_db");

router.get("/clients", async (req, res) => {
  let client_data = sequelize
    .query(`SELECT * FROM  clients_db. ${req.query.data} ;`)
    .then(function ([results, metadata]) {
      return results;
    });
  const clients = await client_data;
  res.send(clients);
});

router.get("/clients_fewer_info", async (req, res) => {
  let client_data = sequelize
    .query(`SELECT id,first,owner_id,date,email_type_id FROM client;`)
    .then(function ([results, metadata]) {
      return results;
    });
  const clients = await client_data;
  res.send(clients);
});
////////////////////////////////////////////////////////////////////
router.post("/clients", async (req, res) => {
  const updatedValues = { ...req.body.updated };
  sequelize.query(
    `UPDATE client SET first='${updatedValues.name}',last='${updatedValues.surName}'  WHERE id=${updatedValues.name_id};`
  );
  sequelize.query(
    `UPDATE country SET country='${updatedValues.country}'  WHERE id=${updatedValues.country_id};`
  );
  res.end();
});
//////////////////////////////////////////////////////////////////////////////
router.post("/clients_newOwner", async (req, res) => {
  const updatedValues = { ...req.body.updated };
  let owner_id = await sequelize.query(
    `SELECT id FROM owner WHERE owner='${updatedValues.newOwner}'`
  );
  sequelize.query(
    `UPDATE client SET owner_id='${owner_id[0][0].id}'  WHERE id=${updatedValues.id};`
  );
  res.end();
});

router.post("/clients_new_emailType", async (req, res) => {
  const updatedValues = { ...req.body.updated };
  let emailType_id = await sequelize.query(
    `SELECT id FROM email_type WHERE email_type='${updatedValues.emailType}'`
  );
  sequelize.query(
    `UPDATE client SET email_type_id='${emailType_id[0][0].id}'  WHERE id=${updatedValues.id};`
  );
  res.end();
});

router.post("/clients_newSale", async (req, res) => {
  const updatedValues = { ...req.body.updated };
  sequelize.query(`UPDATE client SET sold=1  WHERE id=${updatedValues.id};`);
  res.end();
});
//////////////////////////////////////////////////////////////////
router.post("/newClients", async (req, res) => {
  const newValue = { ...req.body.client };
  let country = await sequelize.query(
    `SELECT count(*) FROM country WHERE country='${newValue.country}'`
  );
  let owner = await sequelize.query(
    `SELECT count(*) FROM owner WHERE owner='${newValue.owner}'`
  );

  if (country[0][0]["count(*)"] === 0) {
    await sequelize.query(
      `INSERT INTO country VALUES (null,'${newValue.country}')`
    );
  }
  if (owner[0][0]["count(*)"] === 0) {
    await sequelize.query(
      `INSERT INTO owner VALUES (null,'${newValue.owner}')`
    );
  }
  let country_id = await sequelize.query(
    `SELECT id FROM country WHERE country='${newValue.country}'`
  );
  let owner_id = await sequelize.query(
    `SELECT id FROM owner WHERE owner='${newValue.owner}'`
  );

  let email = newValue.name + newValue.surName + "@imant.com";
  let date = new Date().toLocaleDateString();
  await sequelize.query(
    `INSERT INTO client VALUES (null,'${newValue.surName}','${newValue.name}','${email}',0,'${date}',null,'${owner_id[0][0].id}','${country_id[0][0].id}')`
  );
  res.end();
});

module.exports = router;
