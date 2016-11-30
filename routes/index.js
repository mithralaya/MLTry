"use strict";

var express = require('express');
var router = express.Router();
var csv = require('csv');
const Conn = require('../model/connection');
const W = require('whatsit');
const Connection = new Conn();

/* GET home page. */
router.get('/', function(req, res, next) {
  var category = [];
  var sql = "SELECT * FROM RewardCategory ORDER BY `title` ASC";
  Connection.executeQuery(sql).on("error", (err) => {
    console.log(err);
  }).on("result", (row) => {
    category.push({
      "id": row.id,
      "title": row.title
    });
  }).on("end", () => {
    res.render('index', {title: 'Express', category: JSON.stringify(category)});
  });
});

module.exports = router;
