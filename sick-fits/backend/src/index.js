require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

//My GraphQL Yoga Server
const server = createServer();

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  serverInfo => {
    console.log(
      `Server is now running on port http:/localhost:${serverInfo.port}`
    );
  }
);
