const express = require("express");
const App = express();
const cors = require("cors");
const ConnectTomongo = require("./Connect");

ConnectTomongo();
App.use(express.json());
App.use(cors());
App.use(require("./Router/auth"));
App.use(require("./Router/MatchApi"));
App.listen(4200);
