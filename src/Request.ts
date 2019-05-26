import http = require("http");
import https = require("https");
import { URL } from "url";

export default function request(url: string | URL, options: https.RequestOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, options, (res: http.IncomingMessage) => {
      const { statusCode, statusMessage } = res;
      const contentType = res.headers["content-type"];

      if (statusCode !== 200 || !contentType) {
        reject(new Error(`Request Failed. \nStatus Code: ${statusCode}\nStatus Message: ${statusMessage}`));
      } else if (!/^application\/json/.test(contentType)) {
        reject(new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`));
      }

      let rawData = "";

      res.setEncoding("utf8");
      res.on("data", chunk => rawData += chunk);

      res.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (err) {
          reject(err);
        }
      });
    })
    .on("error", (err) => {
      reject(err);
    });
  });
}
