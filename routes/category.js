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
  if (row[0].length > 0) {
    let sql = "INSERT INTO RewardCategory (`title`) VALUES ('" + row[0] + "') ON DUPLICATE KEY UPDATE `title` = VALUES(title)";
    Connection.executeQuery(sql).on("error", (err) => {
      console.log(err);
    }).on("result", (row) => {
      console.log(row);
    }).on("end", () => {
      console.log("*****INSERT END*****");
    });
  }
}).on('end', () => {
  console.log("****END****");
});

/* GET users listing. */
router.get('/import', function(req, res, next) {
  fs.createReadStream('./category.csv').pipe(parser);
  res.end();
});

module.exports = router;
