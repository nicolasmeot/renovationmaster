const router = require("express").Router();

const User = require("../models/User.model.js");
const Project = require("../models/Project.model.js");
const Room = require("../models/Room.model.js");

router.get("/", (req, res, next) => {
  console.log(req.session.currentUser && req.session.currentUser.projects);
  if (req.session.currentUser) {
    Project.find({ userId: req.session.currentUser._id })
      .then((projectsFromDB) => {
        console.log(projectsFromDB);
        res.render("projects", { projectsFromDB });
      })
      .catch((error) => next(error));
  } else {
    res.redirect("/login");
  }
});

router.get("/new", (req, res, next) => {
  res.render("newproject");
  console.log(req.session.currentUser._id);
});

router.post("/new", (req, res, next) => {
  const projectInfo = {
    userId: req.session.currentUser._id,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Address: req.body.Address,
    PhoneNb: req.body.PhoneNb,
    Email: req.body.Email,
    firstMeetingDate: req.body.firstMeetingDate,
    firstMeetingAddress: req.body.firstMeetingAddress,
    projectDescription: req.body.projectDescription,
    projectDeadline: req.body.projectDeadline,
  };

  Project.create(projectInfo)
    .then((projectFromDB) => {
      console.log(projectFromDB._id);
      res.redirect(
        `/projects/${projectFromDB._id}`
      ); /*juste un test parce que je ne sais pas encore comment res.redirect vers mon project:id*/
    })
    .catch((error) => next(error));
});

router.get("/:id", async (req, res, next) => {
  const projectId = req.params.id;
  try {
    projectDetails = await Project.findById(projectId);
    console.log(projectDetails);
    res.render("project-details", projectDetails);
  } catch (error) {
    console.log("an error happened"), error;
  }
});

router.post("/:projectId/rooms", (req, res, next) => {
  const roomInfo ={
    roomName : req.body.roomName,
    projectId : req.params.projectId,
  }
  console.log(roomInfo)
  Room 
    .create(roomInfo)
    .then((newRoom) => res.redirect(`/projects/${newRoom.projectId}/rooms/${newRoom._id}`) )
    .catch((error) => {console.log("an error happened"),error})
});

module.exports = router;
