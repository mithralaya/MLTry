"use strict";

const express = require('express');
const router = express.Router();
const parse = require('csv-parse');
const fs = require('fs');
const Conn = require('../model/connection');
const parser = parse({delimiter: ","});
const W = require('whatsit');
const Connection = new Conn();

parser.on('data', (row) => {
  if (W.type(row[2]) === "Email") {
    let sql = "INSERT INTO User (`id`, `name`, `email`) VALUES ('" + row[0] + "', '" + row[1] + "', '" + row[2] + "') ON DUPLICATE KEY UPDATE `id` = VALUES(id), `name` = VALUES(name), `email` = VALUES(email)";
    Connection.executeQuery(sql).on("error", (err) => {
      console.log(err);
    }).on("result", (row) => {
      //console.log(row);
    }).on("end", () => {
      //console.log("*****INSERT END*****");
    });
  }
}).on('end', () => {
  console.log("****END****");
});

/* GET users listing. */
router.get('/import', function(req, res, next) {
  fs.createReadStream('./UsersEmail.csv').pipe(parser);
});

module.exports = router;
