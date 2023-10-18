const server = require("./src/server.js");
const { conn } = require("./src/db.js");
require("dotenv").config();
const PORT = 3001;

conn.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log("Listening at", PORT);
  });
});
