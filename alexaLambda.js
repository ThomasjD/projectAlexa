const Alexa = require("alexa-sdk");
const request = require("request");
var handlers = {
  LaunchRequest: function() {
    this.response.speak("Welcome to Digital Craft.  What can I do for you?");
    this.emit(":responseReady");
  },
  createProject: function() {
    this.response.speak("Your project has been created.");
    var projectName = this.event.request.createProject.slots.name.value;
    var projectDescription = this.event.request.createProject.slots.description
      .value;
  }
};

exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  //alexa.appId = APP_ID
  alexa.registerHandlers(event, context);
  alexa.appID = "amzn1.ask.skill.6290412b-54d9-410d-82b0-97a54e360a9e";
  alexa.registerHandlers(handlers);
};
