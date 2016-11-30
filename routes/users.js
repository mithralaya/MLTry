"use strict";

var group = 0;
const express = require('express');
const router = express.Router();
const parse = require('csv-parse');
const fs = require('fs');
const Conn = require('../model/connection');
const parser = parse({delimiter: ","});
const W = require('whatsit');
const Connection = new Conn();
const CreateSend = require('createsend-node');
const cmApi = new CreateSend({
  apiKey: 'd8b76c4a1a84c4b4235f5adbce93539a'
});
const cmClientId = "027423451c3a637dda9330f2a0d1f076";
const cmListId = "b2270c29115200adca7523be88a497a0";

parser.on('data', (row) => {
  if (W.type(row[2]) === "Email" && row[0].length > 0) {
    let sql = "INSERT INTO User (`id`, `name`, `email`, `group`) VALUES ('" + row[0] + "', '" + row[1] + "', '" + row[2] + "', " + group + ") ON DUPLICATE KEY UPDATE `id` = VALUES(id), `name` = VALUES(name), `email` = VALUES(email), `group` = VALUES(`group`)";
    Connection.executeQuery(sql).on("error", (err) => {
      console.log(err);
    }).on("result", (insertedRow) => {
      console.log(insertedRow);
      console.log(row[2]);
      let subscribers = {
        "EmailAddress": row[2],
        "Name": row[1]
      };
      cmApi.subscribers.addSubscriber(cmListId, subscribers, function(err, subscriberRow) {
        console.log(err);
        console.log(subscriberRow);
      });
    }).on("end", () => {
      console.log("*****INSERT END*****");
      group = (group === 0) ? 1 : 0;
    });
  }
}).on('end', () => {
  console.log("****END****");
});

/* GET users listing. */
router.get('/import', function(req, res, next) {
  fs.createReadStream('./UsersEmail.csv').pipe(parser);
  res.end();
});

module.exports = router;
