/*
var Request = require("sdk/request").Request({
  url: "https://twitter.com/Thom_Hartmann/with_replies",
  onComplete: function (response) {
   console.log(JSON.stringify(response.text));
   var worker = pw.Page({
     contentScriptFile: ["./jquery-2.2.0.min.js", "./worker.js"],
     url: "./blank.html"
   });
   worker.postMessage(response.text);
  }
}).get();
*/

var request = require("sdk/request");
var pageMod = require("sdk/page-mod");
var panel = require("sdk/panel");

pageMod.PageMod({
  include: /https:\/\/twitter.com\/.+\/lists\/.+/,  
  contentScriptFile: ["./jquery-2.2.0.min.js", "./content.js"],
  onMessage: function (paramsJSON) {
   var params = JSON.parse(paramsJSON);
   console.log(`https://twitter.com/${params.userName}`);
   panel.Panel({
     contentURL: `https://twitter.com/${params.userName}`,
     contentScriptFile: ["./jquery-2.2.0.min.js", "./get-token.js"],
     onMessage: function (token) {
      var thisPanel = this;
      var url = `https://twitter.com/i/${params.userID}/lists/${params.listID}/members`;
      request.Request({
        url: url,
        onComplete: function (response) {
         thisPanel.hide();
         if (response.status == 200) {
          alert("ok");
         }
         else {
          alert("fail");
         }
        },
        headers: {
         referer: url,
         accept: "application/json, text/javascript, */*; q=0.01"
        },
        content: {
         authenticity_token: token
        }
      }).post();
     }
   }).show();
  }
});

