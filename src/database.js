const lowdb = require("lowdb");
const fileAsync = require("lowdb/adapters/FileAsync");
const username = require('username')

let db;

async function createConnection() {
  const adapter = new fileAsync('/home/'+ username.sync() +'/files_medias/db.json');
  db = await lowdb(adapter);
  db.defaults({ medias: [] }).write();
}

const getConnection = () => {
  return db;
};

module.exports = {
  createConnection,
  getConnection,
};
