"use strict";

const mysql = require("mysql");
//const events = require("events");

module.exports = class Connection {
  constructor () {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "SuperKings12",
      database: "MLTry",
      supportBigNumbers: true,
      connectTimeout: 7000,
      dateStrings: true,
      connectionLimit: 20,
      queueLimit: 20
    });
    //this.eventEmitter = new events.EventEmitter();
  }

  executeQuery (sql) {
    let query = this.connection.query(sql);
    /*query.on('error', function(err) {
          // Handle error, an 'end' event will be emitted after this as well
          this.eventEmitter("mysqlError", err);
        })
        .on('result', function(row) {
          // Pausing the connnection is useful if your processing involves I/O
          this.connection.pause();
          this.eventEmitter("mysqlRow", row);
          this.connection.resume();
        })
        .on('end', function() {
          // all rows have been received
          this.eventEmitter("mysqlEnd");
        });*/
    return query;
  }
};
