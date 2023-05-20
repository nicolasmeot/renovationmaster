const router = require("express").Router();

const User = require("../models/User.model.js");
const Project = require("../models/Project.model.js");


router.get("/projects", (req, res, next) => {
  console.log(req.session.currentUser.projects)
  if (req.session.currentUser) {
    res.render('projects', {userInSession : req.session.currentUser.projects})
    }
  else {
    res.redirect("/login");
  }
});

router.get("/projects/new", (req, res, next) => {
  res.render('newproject')
});

router.post("/projects/new", (req, res, next) => {
    const projectInfo = req.body;
    console.log(projectInfo);
    Project.create(projectInfo)
        .then(() => {
            res.redirect("/profile") /*juste un test parce que je ne sais pas encore comment res.redirect vers mon project:id*/
        })
        .catch((error) => next(error));
    /*{ 
        clientFirstName: clientFirstName,
        clientLastName: clientLastName,
        clientAddress : clientAddress,
        clientPhoneNumber : clientPhoneNumber,
        clientEmail : clientEmail,
        firstMeetingDate : firstMeetingDate,
        firstMeetingAddress : firstMeetingAddress,
        projectDescription : projectDescription,
        projectDeadline : projectDeadline,
        });*/
});

module.exports = router;
