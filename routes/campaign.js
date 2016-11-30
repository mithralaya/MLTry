"use strict";

const express = require('express');
const router = express.Router();
const CreateSend = require('createsend-node');
const cmApi = new CreateSend({
  apiKey: 'd8b76c4a1a84c4b4235f5adbce93539a'
});
const cmClientId = "027423451c3a637dda9330f2a0d1f076";
const cmListId = "b2270c29115200adca7523be88a497a0";

router.post('/preview', function(req, res, next) {
  let timestamp = +new Date();
  let payload = {
    "Name": req.body.subject + "-" + timestamp.toString(),
    "Subject": req.body.subject,
    "FromName": "Stefan Greer",
    "FromEmail": "stefan@weraiseapp.com",
    "ReplyTo": "stefan@weraiseapp.com",
    "ListIDs": [
      "d2ac807f48294c1172d10cd3ce092b5a"
    ],
    "TemplateID": "49e0802e2d717825ebb517e99c4f1cf4",
    "TemplateContent": {
      "Singlelines": [
        {
          "Content": "Dear [firstname,fallback=Customer]"
        }
      ],
      "Multilines": [
        {
          "Content": req.body.text
        }
      ],
      "Repeaters": [
        {
          "Items": [
            {
              "Layout": "My layout",
              "Images": [
                {
                  "Content": "http://asset.weraiseapp.com.s3.amazonaws.com/email/" + req.body.offers[0].image,
                  "Alt": req.body.offers[0].title,
                  "Href": req.body.offers[0].link
                }
              ],
              "Singlelines": [
                {
                  "Content": req.body.offers[0].title,
                  "Href": req.body.offers[0].link
                }
              ],
              "Multilines": [
                {
                  "Content": req.body.offers[0].desc
                }
              ]
            },
            {
              "Layout": "My layout",
              "Images": [
                {
                  "Content": "http://asset.weraiseapp.com.s3.amazonaws.com/email/" + req.body.offers[1].image,
                  "Alt": req.body.offers[1].title,
                  "Href": req.body.offers[1].link
                }
              ],
              "Singlelines": [
                {
                  "Content": req.body.offers[1].title,
                  "Href": req.body.offers[1].link
                }
              ],
              "Multilines": [
                {
                  "Content": req.body.offers[1].desc
                }
              ]
            }
          ]
        },
        {
          "Items": [
            {
              "Layout": "My layout",
              "Images": [
                {
                  "Content": "http://asset.weraiseapp.com.s3.amazonaws.com/email/" + req.body.offers[2].image,
                  "Alt": req.body.offers[2].title,
                  "Href": req.body.offers[2].link
                }
              ],
              "Singlelines": [
                {
                  "Content": req.body.offers[2].title,
                  "Href": req.body.offers[2].link
                }
              ],
              "Multilines": [
                {
                  "Content": req.body.offers[2].desc
                }
              ]
            },
            {
              "Layout": "My layout",
              "Images": [
                {
                  "Content": "http://asset.weraiseapp.com.s3.amazonaws.com/email/" + req.body.offers[3].image,
                  "Alt": req.body.offers[3].title,
                  "Href": req.body.offers[3].link
                }
              ],
              "Singlelines": [
                {
                  "Content": req.body.offers[3].title,
                  "Href": req.body.offers[3].link
                }
              ],
              "Multilines": [
                {
                  "Content": req.body.offers[3].desc
                }
              ]
            }
          ]
        }
      ]
    }
  };
  cmApi.campaigns.createFromTemplate(cmClientId, payload, function(err, campaign) {
    if (err) {
      res.statusCode = 400;
      res.json({
        "error": err
      });
    } else {
      let campaignPreview = {
                                "PreviewRecipients": req.body.previewEmailsAdd.split(","),
                                "Personalize": "Random"
                            };
      cmApi.campaigns.sendPreview(campaign.campaignId, campaignPreview, function(sendErr, sendSuccess) {
        if (sendErr) {
          res.statusCode = 400;
          res.json({
            "error": sendErr
          });
        } else {
          res.statusCode = 200;
          res.json({
            "campaignId": campaign.campaignId
          });
        }
      });
    }
  });
});

router.post('/draft', function(req, res, next) {
  console.log(req.body);
  /*let payload = {
    "ConfirmationEmail": req.body.confirmationEmail.split(","),
    "SendDate": req.body.sendDate
  };
  cmApi.campaigns.sendPreview(req.body.campaignId, payload, function(err, success) {

  });*/
});

module.exports = router;
