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

///GET project, then project id
axios({
  method: "get",
  url: final_Url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "BASIC " + base64
  }
})
  .then(function(response) {
    //console.log(response.data.projects);
    //console.log(response.data.projects);
    //console.log(response.data["todo-items"]);
    //var iFoundProject = "";
    let currentProjects = response.data.projects;
    currentProjects.forEach(project => {
      // console.log(project.name);
      // console.log(project.id);
      //console.log("*");
      if (project.name === "project abcd") {
        console.log(project.id);
        //var iFoundProject = project.id;
      }
    });
    //console.log(iFoundProject);
    //return projec;
  })
  .catch(function(err) {
    console.log(err);
  });
