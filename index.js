var http = require("request");

const axios = require("axios");
//var company = "https://alexalapraim.teamwork.com";
var company = "https://alexalapraim";
var key = "twp_8ERiNvMekc5pqzoJ5V6b80IunZjx";
var password = "scoobiefrickingdooo";
var base64 = new Buffer(key + ":" + password).toString("base64");

//URL
var lapraimUrl = "https://alexalapraim.teamwork.com";

var getRequest = "/projects.json";

//var final_Url = lapraimUrl + getRequest;
var final_Url =
  "https://alexalapraim.teamwork.com/search.json?searchFor=project&searchTerm=publishing";
//GET tasks
axios({
  method: "get",
  url: final_Url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "BASIC " + base64
  }
})
  .then(function(res) {
    console.log(res);
  })
  .catch(function(error) {
    console.log(error);
  });
