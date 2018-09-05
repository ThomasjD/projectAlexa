//Projects
exports.handler = (event, context) => {
  var req = event.request;
  var res = makeResponse("Unable to process your request");

  try {
    if (req.type === "LaunchRequest") {
      res = makeResponse("Welcome to your first Alexa skill.");
    } else if (req.type === "IntentRequest" && req.intent) {
      switch (req.intent.name) {
        case "getAllProjects": {
          //Retrieves all accessible projects. Default returns your active projects.
          let userId = "";
          let pathRoute = "GET/projects.json";
          res = makeResponse("Hello, How are you?");
          break;
        }

        case "getProjectById": {
          //Returns a single project identified by its integer ID.
          let pathRoute = `GET/projects/${userId}.json`;
          res = handleDisplayGreetings(req.intent);
          break;
        }

        case "updateProjectById": {
          //update project based on id
          let pathRoute = "PUT/projects/{id}.json";

          res = handleFavoriteLanguage(event);
          break;
        }
        case "createProject": {
          //create a project
          let pathRoute = "POST/projects.json";

          res = handleFavoriteLanguage(event);
          break;
        }
        case "deleteProjectbyId": {
          //Deletes a single project by id

          let pathRoute = `DELETE/projects/${userId}.json`;
          res = handleFavoriteLanguage(event);
          break;
        }
        case "updateProjectById": {
          //Update project status
          PUT / projects / { id }.json;
          let pathRoute = `PUT/projects/${userId}.json`;
          res = handleFavoriteLanguage(event);
          break;
        }
      }
    }
    context.succeed(res);
  } catch (e) {
    context.fail("Exception: " + e);
  }
};

/*
getAllProjects
can you pull up {all}  {projects}
open up {all} the {projects}
I want to know what are all the {projects}
what are all the {projects}


//getProjectById
find me {project} {name}
open {project} {name}


*/
