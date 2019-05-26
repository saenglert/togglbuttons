import fs = require("fs");
import path = require("path");

interface Button {
    id: number;
    description: string;
    wid: number;
    pid: number;
}

interface Config {
    api: {key: string, url: string};
    buttons: Button[];
}

const raw = fs.readFileSync(path.join(__dirname, "..", "config.json"), "utf8");
const config: Config = JSON.parse(raw);

export default abstract class ConfigStatic {
    public static api = config.api;
    public static buttons = config.buttons;
}
