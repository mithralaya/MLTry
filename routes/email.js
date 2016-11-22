"use strict";

const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const CreateSend = require('createsend-node');
const cmApi = new CreateSend({
  apiKey: 'd8b76c4a1a84c4b4235f5adbce93539a'
});
const cmClientId = "027423451c3a637dda9330f2a0d1f076";

AWS.config.update({
  accessKeyId: "AKIAJLDU5OII37WI5ZZQ",
  secretAccessKey: "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",
  region: "us-east-1"
});

const ses = new AWS.SES({
  apiVersion: '2010-12-01'
});

router.get('/campaignMonitor', function() {
  /*let details = {
    "Name": "Template Two",
    "HtmlPageURL": "http://asset.weraiseapp.com.s3.amazonaws.com/email/CMTemplate.html"
  };
  cmApi.post('templates/' + cmClientId + '.json', null, details, function(err, templateId) {
            console.log(err);
            console.log(templateId);
        });*/
  let payload = {
    "Name": "Teamfirst Campaign - Test",
    "Subject": "My Subject",
    "FromName": "My Name",
    "FromEmail": "karthik@weraiseapp.com",
    "ReplyTo": "karthik@weraiseapp.com",
    "ListIDs": [
      "b2270c29115200adca7523be88a497a0"
    ],
    "TemplateID": "8351241b0e672a18896cca43d00cd66a",
    "TemplateContent": {
      "Singlelines": [
        {
          "Content": "Dear Karthik"
        }
      ],
      "Multilines": [
        {
          "Content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus elit lorem, a rutrum dolor elementum vitae. Praesent finibus in lacus a venenatis. Aenean rhoncus purus eu gravida auctor."
        }
      ],
      "Repeaters": [
        {
          "Items": [
            {
              "Layout": "My layout",
              "Images": [
                {
                  "Content": "http://asset.weraiseapp.com.s3.amazonaws.com/email/1e207.jpg",
                  "Alt": "Domino's - up to 20% off + 1-3% for your team",
                  "Href": "http://teamfirstapp.com/"
                }
              ],
              "Singlelines": [
                {
                  "Content": "Domino's - up to 20% off + 1-3% for your team",
                  "Href": "http://teamfirstapp.com/"
                }
              ],
              "Multilines": [
                {
                  "Content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                }
              ]
            },
            {
              "Layout": "My layout",
              "Images": [
                {
                  "Content": "http://asset.weraiseapp.com.s3.amazonaws.com/email/152ff.jpg",
                  "Alt": "MyProtein - 10% off + 6% for your team AND NEW COMPETITION",
                  "Href": "http://teamfirstapp.com/"
                }
              ],
              "Singlelines": [
                {
                  "Content": "MyProtein - 10% off + 6% for your team AND NEW COMPETITION",
                  "Href": "http://teamfirstapp.com/"
                }
              ],
              "Multilines": [
                {
                  "Content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
                  "Content": "http://asset.weraiseapp.com.s3.amazonaws.com/email/c6240.jpg",
                  "Alt": "ASOS - 7% for your team",
                  "Href": "http://teamfirstapp.com/"
                }
              ],
              "Singlelines": [
                {
                  "Content": "ASOS - 7% for your team",
                  "Href": "http://teamfirstapp.com/"
                }
              ],
              "Multilines": [
                {
                  "Content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                }
              ]
            },
            {
              "Layout": "My layout",
              "Images": [
                {
                  "Content": "http://asset.weraiseapp.com.s3.amazonaws.com/email/ce00f.jpg",
                  "Alt": "Lastminute.com - Earn 2-12% for your team",
                  "Href": "http://teamfirstapp.com/"
                }
              ],
              "Singlelines": [
                {
                  "Content": "Lastminute.com - Earn 2-12% for your team",
                  "Href": "http://teamfirstapp.com/"
                }
              ],
              "Multilines": [
                {
                  "Content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                }
              ]
            }
          ]
        }
      ]
    }
  };
  cmApi.campaigns.createFromTemplate(cmClientId, payload, function(err, campaign) {
    console.log(err);
    console.log(campaign);
  });
});
/* Send Email listing. */
router.get('/send', function(req, res, next) {
  var params = {
    Destination: {
      ToAddresses: [
        'karthik@weraiseapp.com',
        'stefan@teamfirstapp.com'
      ]
    },
    Message: {
      Body: {
        Html: {
          Data: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns:fb="http://www.facebook.com/2008/fbml" xmlns:og="http://opengraph.org/schema/"> <head> <meta property="og:title" content="TeamFirst Weekly Campaign"/> <meta property="fb:page_id" content="708587851"/> <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>TeamFirst Weekly Campaign</title> </head> <body style="margin: 0px; padding: 0px; font-family: Arial, \'Helvetica\', sans-serif"> <div class="container" style="width: 800px; height: auto; margin: 0px auto; padding: 50px 10px;"> <div class="logo" style="text-align: center; font-size: 16pt; font-weight:500;"> <img src="http://asset.weraiseapp.com.s3.amazonaws.com/email/logo.png" alt="Team First"/> </div><hr style="border: none; border-bottom: 1px solid #000; box-shadow: none;"/> <div class="someText" style="text-align: center; font-size: 16pt; font-weight:500;"> <p style="text-align:left;">Dear Karthik,</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus elit lorem, a rutrum dolor elementum vitae. Praesent finibus in lacus a venenatis. Aenean rhoncus purus eu gravida auctor.</p></div><hr style="border: none; border-bottom: 1px solid #000; box-shadow: none;"/> <div class="content" style="margin: 20px 0px;"> <table cellpadding="0" cellspacing="0" width="800"> <tbody> <tr> <td align="center" width="400"> <div class="image"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #5bd6a2;"><img src="http://asset.weraiseapp.com.s3.amazonaws.com/email/1e207.jpg" alt="Domino\'s Pizza" width="350" style="border-radius: 5px;"/></a> </div><div class="title" style="font-weight: 800; font-size: 10pt;"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #5bd6a2;"><p>Domino\'s - up to 20% off + 1-3% for your team</p></a> </div><div class="text" style="font-size: 10pt; color: #999999;"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #999999;"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></a> </div></td><td align="center" width="400"> <div class="image"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #5bd6a2;"><img src="http://asset.weraiseapp.com.s3.amazonaws.com/email/152ff.jpg" alt="Domino\'s Pizza" width="350" style="border-radius: 5px;"/></a> </div><div class="title" style="font-weight: 800; font-size: 10pt;"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #5bd6a2;"><p>MyProtein - 10% off + 6% for your team AND NEW COMPETITION</p></a> </div><div class="text" style="font-size: 10pt; color: #999999;"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #999999;"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></a> </div></td></tr><tr> <td align="center" width="400"> <div class="image"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #5bd6a2;"><img src="http://asset.weraiseapp.com.s3.amazonaws.com/email/c6240.jpg" alt="Domino\'s Pizza" width="350" style="border-radius: 5px;"/></a> </div><div class="title" style="font-weight: 800; font-size: 10pt;"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #5bd6a2;"><p>ASOS - 7% for your team</p></a> </div><div class="text" style="font-size: 10pt; color: #999999;"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #999999;"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></a> </div></td><td align="center" width="400"> <div class="image"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #5bd6a2;"><img src="http://asset.weraiseapp.com.s3.amazonaws.com/email/ce00f.jpg" alt="Domino\'s Pizza" width="350" style="border-radius: 5px;"/></a> </div><div class="title" style="font-weight: 800; font-size: 10pt;"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #5bd6a2;"><p>Lastminute.com - Earn 2-12% for your team</p></a> </div><div class="text" style="font-size: 10pt; color: #999999;"> <a href="https://www.teamfirstapp.com" style="text-decoration: none; color: #999999;"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></a> </div></td></tr></tbody> </table> </div><hr style="border: none; border-bottom: 1px solid #000; box-shadow: none;"/> <div class="someText" style="text-align: center; font-size: 16pt; font-weight:500;"> <p style="text-align:left; font-size: 12pt">Many Thanks, <br/>Stefan from TeamFirst</p></div></div></body></html>'
        },
        Text: {
          Data: 'Heyyyyyy! Good Evening.'
        }
      },
      Subject: {
        Data: 'Hello World'
      }
    },
    Source: 'karthik@weraiseapp.com',
    ReplyToAddresses: [
      'stefan@teamfirstapp.com'
    ],
    ReturnPath: 'stefan@teamfirstapp.com'
  };
ses.sendEmail(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
});

module.exports = router;
