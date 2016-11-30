"use strict";
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('formApp', ['ui.router'])

// configuring our routes
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('form', {
            url: '/form',
            templateUrl: '/html/form.html',
            controller: 'formController'
        }).state('form.campaign', {
            url: '/campaign',
            templateUrl: '/html/form-campaign.html'
        }).state('form.offers', {
            url: '/offers',
            templateUrl: '/html/form-offers.html'
        }).state('form.review', {
            url: '/review',
            templateUrl: '/html/form-review.html'
        });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/form/campaign');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope, $http) {
    // we will store all of our form data in this object
    $scope.formData = {};
    $scope.catrgories = category;
    $scope.campaign = {
      "subject": "**Hello Students**",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus elit lorem, a rutrum dolor elementum vitae. Praesent finibus in lacus a venenatis. Aenean rhoncus purus eu gravida auctor.",
      "offers": [
        {
          "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "link": "http://teamfirstapp.com",
          "category": "0",
          "image": "placeholder.jpg"
        },
        {
          "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "link": "http://teamfirstapp.com",
          "category": "0",
          "image": "placeholder.jpg"
        },
        {
          "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "link": "http://teamfirstapp.com",
          "category": "0",
          "image": "placeholder.jpg"
        },
        {
          "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "link": "http://teamfirstapp.com",
          "category": "0",
          "image": "placeholder.jpg"
        }
      ]
    };
    // function to process the form
    $scope.processForm = function() {
      $("#preloaderOverlay").show();
      $http.post('/send/preview', $scope.campaign).then(function(success) {
        console.log(success);
        $("#preloaderOverlay").hide();
        $scope.campaign.campaignId = success.data.campaignId;
        $scope.campaignIdText = "Campaign Id: " + success.data.campaignId;
      }, function(err) {
        $("#preloaderOverlay").hide();
        $scope.error = err + "<br/> Check with developers";
        console.log(err);
      });
    };
    $scope.sendEmails = function() {
      var payload = {
        "campaign": $scope.campaign
      };
      $("#preloaderOverlay").show();
      $http.post('/send/draft', payload).then(function(success) {
        console.log(success);
        $("#preloaderOverlay").hide();
      }, function(err) {
        $scope.error = err + "<br/> Check with developers";
        console.log(err);
        $("#preloaderOverlay").hide();
      });
    };

});
