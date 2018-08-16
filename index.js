
const Alexa = require("alexa-sdk");
var handlers = {
  "LaunchRequest": function() {
    this.response.speak("Welcome to Digital Craft.  What can I do for you?")
    this.emit(':responseReady')
  }
  "createProject": function() {
    this.response.speak("Your project has been created.")
  }
}


exports.handler = function(event, context, callback) {

  const alexa = Alexa.handler(event, context, callback);
  //alexa.appId = APP_ID
  alexa.registerHandlers(event, context)
  alexa.appID = "amzn1.ask.skill.6290412b-54d9-410d-82b0-97a54e360a9e";
};


var http = require("request");

const axios = require("axios");
var company = "https://alexalapraim.teamwork.com";
var key = "twp_8ERiNvMekc5pqzoJ5V6b80IunZjx";
var password = "scoobiefrickingdooo";
var base64 = new Buffer(key + ":" + password).toString("base64");

//GET() using axios
var lapraimUrl = "https://alexalapraim.teamwork.com";

var getRequest = "/projects.json";

var final_Url = lapraimUrl + getRequest;

//GET tasks
axios({
  method: "get",
  url: final_Url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "BASIC " + base64
  }
}).then(function(response) {
  console.log(response.data.projects);
  //console.log(response.data.projects);
  //console.log(response.data["todo-items"]);
});

/*
//POST CREATE NEW PROJECT
var newProject = "Project XXXXXXXXXXXXXXXXXXXXXXXXX";
var newProjectDescription = "Project AAAAAAAAAAAAAAAAA";
axios({
  method: "post",
  url: final_Url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "BASIC " + base64
  },
  data: {
    project: {
      name: "AAAAAAAAAAAAAAAAAAA234",
      description: "BBBBBBBBBBBBBBBB234"
    }
  }

  // name: project[newProject],
  // description: project[newProjectDescription]
})
  .then(function(response) {
    console.log(response.data.id);
    //console.log(response.data.projects);
    //console.log(response.data["todo-items"]);
  })
  .catch(function(error) {
    //console.log(error);
  });
*/

//let currentProjects = response.data.projects;

// response.data["todo-items"].forEach(function(task) {
//     console.log(task["todo-list-name");
//   });
// })
// .catch(function(error) {
//   console.log(error);
// });
