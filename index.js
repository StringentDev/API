const compression = require("compression");
const express = require("express");
const App = express();
const Database = require("./paper_redux")
// Compress all HTTP responses
App.use(compression());
App.use("/", require("./read.js"));

//api end
App.get("*", (req, res) => res.status(404).send("404"));
App.listen("3000", () => {
    console.log("server started");
});
