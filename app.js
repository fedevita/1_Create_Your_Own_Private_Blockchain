/**
 *                 ApplicationServer
 *             (Do not change this code)
 * Require Modules to setup the REST Api
 * - `express` Express.js is a Web Framework
 * - `morgan` Isn't required but help with debugging and logging
 * - `body-parser` This module allows to parse the body of the post request into a JSON
 */

const config = require("./config.js");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
/**
 * Require the Blockchain class. This allow us to have only one instance of the class.
 */
const BlockChain = require("./src/blockchain.js");

class ApplicationServer {
  constructor() {
    //Express application object
    this.app = express();
    //Blockchain class object
    this.blockchain = new BlockChain.Blockchain();
    //Method that initialized the express framework.
    this.initExpress();
    //Method that initialized middleware modules
    this.initExpressMiddleWare();
    //Method that initialized the controllers where you defined the endpoints
    this.initControllers();
    //Method that run the express application.
    this.start();
  }

  initExpress() {
    this.app.set("port", config.PORT);
    this.app.set("host", config.HOST);
  }

  initExpressMiddleWare() {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  initControllers() {
    require("./BlockchainController.js")(this.app, this.blockchain);
  }

  start() {
    let self = this;
    this.app.listen(this.app.get("port"), this.app.get("host"), () => {
      console.log(
        `Server Listening on: ${self.app.get("host")}:${self.app.get("port")}`
      );
    });
  }
}

new ApplicationServer();