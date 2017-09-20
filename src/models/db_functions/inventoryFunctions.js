const dbConnection = require('../Database/db_connection.js');

const addInventory = (inv, cb) => {
  const sql = {text: 'INSERT INTO inventories(name, location, capacity, status) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [inv.name, inv.location, inv.capacity, inv.status]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getAllInv = (cb) => {
  const sql = {
    text: 'SELECT * FROM inventories'
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};
module.exports = {
  addInventory: addInventory,
  getAllInv: getAllInv
};
