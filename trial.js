//'use strict';

var Alexa = require("alexa-sdk");

var flashcardsDictionary = [
  {
    state: "California",
    capital: "Sacramento"
  },
  {
    state: "Hawaii",
    capital: "Honolulu"
  },
  {
    state: "Texas",
    capital: "Austin"
  },
  {
    state: "Georgia",
    capital: "Atlanta"
  }
];

var DECK_LENGTH = flashcardsDictionary.length;

var handlers = {
  myFavoriteLanguageIntent: function() {
    this.emit(":tell", "Your favorite language is");
  },

  // Open Codecademy Flashcards
  LaunchRequest: function() {
    if (Object.keys(this.attributes).length === 0) {
      //this.attributes['yourAttribute'] = 'value'; key: value storage in dynamoDB
      this.attributes.flashcards = {
        numberCorrect: 0,
        currentFlashcardIndex: 0
      };
      //what is this.attributes???
      this.response
        .speak(AskQuestion(this.attributes))
        .listen(AskQuestion(this.attributes));
    } else {
      var currentFlashcardIndex = this.attributes.flashcards
        .currentFlashcardIndex;
      var numberCorrect = this.attributes.flashcards.numberCorrect;

      this.response
        .speak(
          "Welcome back to Flashcards. You are on question" +
            currentFlashcardIndex +
            "and have answered" +
            numberCorrect +
            " correctly." +
            AskQuestion(this.attributes)
        )
        .listen(); //AskQuestion(this.attributes)
    }
    this.emit(":responseReady");
  },

  // User gives an answer
  AnswerIntent: function() {
    var userAnswer = this.event.intent.slots.answer.value;
    var currentFlashcardIndex = this.attributes.flashcards
      .currentFlashcardIndex;
    var numberCorrect = this.attributes.flashcards.numberCorrect;

    //flashcardsDictionary is an object so thats why no need ot get. this.attributes
    var correctanswer = flashcardsDictionary[currentFlashcardIndex].capital;
    if (correctanswer === userAnswer) {
      this.attributes.flashcards.numberCorrect++;
      this.attributes.flashcards.currentFlashcardIndex++;

      this.response
        .speak(
          "Nice job! The correct answer is " +
            correctanswer +
            ". You " +
            "have gotten " +
            numberCorrect +
            " out of " +
            DECK_LENGTH +
            " " +
            " questions correct. Here is your next question. " +
            AskQuestion(this.attributes)
        )
        .listen(AskQuestion(this.attributes));
    } else {
      this.attributes.flashcards.currentFlashcardIndex++;
      this.response
        .speak(
          "Sorry, the correct answer is " +
            correctanswer +
            ". You " +
            "have gotten " +
            numberCorrect +
            " out of " +
            DECK_LENGTH +
            " " +
            " questions correct. Here is your next question. " +
            AskQuestion(this.attributes)
        )
        .listen(AskQuestion(this.attributes));
    }
    this.emit(":responseReady");
  },

  // Stop
  "AMAZON.StopIntent": function() {
    this.response.speak("Ok, let's play again soon.");
    this.emit(":responseReady");
  },

  // Cancel
  "AMAZON.CancelIntent": function() {
    this.response.speak("Ok, let's play again soon.");
    this.emit(":responseReady");
  },

  // Save state
  SessionEndedRequest: function() {
    console.log("session ended!");
    this.emit(":saveState", true);
  }
};

// Test my {language} knowledge
var AskQuestion = function(attributes) {
  var currentFlashcardIndex = attributes.flashcards.currentFlashcardIndex;

  if (currentFlashcardIndex >= DECK_LENGTH) {
    return "No questions remaining.";
  } else {
    var currentState = flashcardsDictionary[currentFlashcardIndex].state;
    return "What is the capital of " + currentState + "?";
  }
};

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context, callback);
  alexa.dynamoDBTableName = "stateCapitalTable";
  alexa.registerHandlers(handlers);
  alexa.execute();
};
