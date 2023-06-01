const router = require("express").Router();

const Project = require("../models/Project.model.js");
const Room = require("../models/Room.model.js");
const Task = require("../models/Task.model.js");

const fileUploader = require("../config/cloudinary.config");

router.get("/:projectId/rooms/:id", async (req, res, next) => {
  const roomId = req.params.id;
  try {
    roomFromDB = await Room.findById(roomId);
    taskDetails = await Task.find({ roomId: roomId });
    console.log("roomFromDB=", roomFromDB);
    res.render("room-details", { taskDetails, roomFromDB });
  } catch (error) {
    console.log("an error happened", error);
  }
});

//Route to upload Room's img

router.post(
  "/:projectId/rooms/:id/photos",
  fileUploader.fields([{ name: "roomImg", maxCount: 10 }]),
  (req, res) => {
    const photoToUpdate = req.query.field;
    const projectId = req.params.projectId;
    const roomId = req.params.id;
    const updatedPhotos = req.files.roomImg.map((el) => el.path);
    console.log(
      "updatedPhotos:",
      updatedPhotos,
      "Photo to Update",
      photoToUpdate
    );
    switch (photoToUpdate) {
      case "roomInitialPictures":
        Room.findByIdAndUpdate(
          roomId,
          { $push: { roomInitialPictures: updatedPhotos } },
          { new: true }
        )
          .then((roomFromDB) => {
            console.log("RoomFromDB", roomFromDB);
            res.redirect(`/projects/${projectId}/rooms/${roomId}`);
          })
          .catch((error) =>
            console.log(`Error while uploading the floorPlan: ${error}`)
          );
        break;
      case "threeDRendering":
        Room.findByIdAndUpdate(
          roomId,
          { $push: { threeDRendering: updatedPhotos } },
          { new: true }
        )
          .then((roomFromDB) => {
            console.log("RoomFromDB", roomFromDB);
            //test code pour upload la main image
            Project.findByIdAndUpdate(
              projectId,
              { mainPicture: roomFromDB.threeDRendering[0] },
              { new: true }
            )
              .then(() =>
                res.redirect(`/projects/${projectId}/rooms/${roomId}`)
              )
              .catch((error) => console.log("stg happened", error));
          })
          .catch((error) =>
            console.log(`Error while uploading the floorPlan: ${error}`)
          );
        break;
      case "currentPictures":
        Room.findByIdAndUpdate(
          roomId,
          { $push: { currentPictures: updatedPhotos } },
          { new: true }
        )
          .then((roomFromDB) => {
            console.log("RoomFromDB", roomFromDB);
            res.redirect(`/projects/${projectId}/rooms/${roomId}`);
          })
          .catch((error) =>
            console.log(`Error while uploading the floorPlan: ${error}`)
          );
        break;
    }
  }
);

//Route to delete Room's img

router.get(
  "/:projectId/rooms/:id/photos/del/:field/:index",
  (req, res, next) => {
    const field = req.params.field;
    const projectId = req.params.projectId;
    const roomId = req.params.id;
    const index = Number(req.params.index); // "1"
    console.log("Index is", index);

    if (
      !["roomInitialPictures", "threeDRendering", "currentPictures"].includes(
        field
      )
    ) {
      next(new Error("Invalid photo field"));
    }

    // switch (field) {
    //   case 'roomInitialPictures' {

    //   }
    // }

    Room.findById(roomId).then((roomFromDB) => {
      roomFromDB[field].splice(index, 1);
      roomFromDB.save().then(() => {
        res.redirect(`/projects/${projectId}/rooms/${roomId}`);
      });
    });
  }
);

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
    materials: [
      {
        material: req.body.material,
        materialCost: req.body.materialCost,
      },
    ],
    workers: [
      {
        workerName: req.body.workerName,
        workerHourlyPrice: req.body.workerPrice,
        hoursSpent: req.body.workerTime,
      },
    ],
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
