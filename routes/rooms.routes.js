const router = require("express").Router();

const Project = require("../models/Project.model.js");
const Room = require("../models/Room.model.js");
const Task = require("../models/Task.model.js");

const fileUploader = require('../config/cloudinary.config')

router.get("/:projectId/rooms/:id", (req, res, next) => {
  const roomId = req.params.id;
  Room.findById(roomId)
    .then((roomFromDB) =>
      res.render("room-details", {
        roomFromDB,
      })
    )
    .catch((err) => next(err));
});

//Route to upload Room's img

router.post('/:projectId/rooms/:id/photos', fileUploader.fields({name:"roomImg",maxCount:10}), (req, res) => {
    const photoToUpdate = req.query.field;
    const projectId = req.params.projectId
    const roomId = req.params.id
    const updatedPhotos = req.files.roomImg.map(el => el.path)
    console.log('updatedPhotos:',updatedPhotos, "Photo to Update",photoToUpdate)
    Room.findByIdAndUpdate(roomId,{$push: {photoToUpdate: updatedPhotos}}, { new: true })
      .then(() =>   res.redirect(`/projects/${projectId}/rooms${_id}`))
      .catch(error => console.log(`Error while uploading the floorPlan: ${error}`));
  })


router.post("/:projectId/rooms/:roomId/tasks", (req, res, next) => {
  const taskInfo = {
    projectId: req.params.projectId,
    roomId: req.params.roomId,
    randomParam: "random",
  };
  console.log(taskInfo);
  Task.create(taskInfo)
    .then((taskFromDB) =>
      res.redirect(
        `/projects/${taskFromDB.projectId}/rooms/${taskFromDB.roomId}/tasks/${taskFromDB._id}/edit`
      )
    )
    .catch((error) => {
      console.log("an error happened", error);
    });
});

router.get("/:projectId/rooms/:roomId/tasks/:id/edit", (req, res, next) => {
  const taskId = req.params.id;
  Task.findById(taskId)
    .then((taskFromDB) => {
      res.render("tasks-newedit", taskFromDB);
    })
    .catch((error) => next(error));
});

router.post("/:projectId/rooms/:roomId/tasks/:id/edit", (req, res, next) => {
  const taskId = req.params.id;
  const taskInfo = {
    category: req.body.category,
    procedure: req.body.procedure,
    position: req.body.position,
    remarks: req.body.remarks,
    /*details: [{
            material: req.body.material,
            materialCost: req.body.materialCost,
            done: Boolean,
    }],
    workers: [{
        workerName: String,
        workerHourlyPrice: Number,
        hoursSpent : Number
    }],*/
    startDate: req.body.startDate,
    /*startAfter : req.body.startAfter,*/
    finishDate: req.body.finishDate,
  };
  Task.findByIdAndUpdate(taskId, taskInfo, { new: true })
    .then((taskFromDB) => {
      console.log(taskFromDB);
      res.redirect(
        `/projects/${taskFromDB.projectId}/rooms/${taskFromDB.roomId}`
      );
    })
    .catch((error) => next(error));
});

module.exports = router;
