import express = require("express");
import path = require("path");
import Button from "./Button";
import Config from "./Config";
import Toggl from "./Toggl";

const Buttons = Config.buttons.map(button => new Button(button.id, button.description, button.wid, button.pid))

const port = process.env.port || 3000;
const app = express();
app.use(express.static("public"));
app.get("/buttons", (req, res) => {});
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

process.on("SIGINT", () => {
    Buttons.forEach((button) => {
        button.unexport();
    });
    server.close();
});
