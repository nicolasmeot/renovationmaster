const router = require("express").Router()

const Project = require("../models/Project.model.js")
const Room = require("../models/Room.model.js")

router.get("/:projectId/rooms/:id", (req, res, next) => {
    const roomId = req.params.id
    Room
        .findById(roomId)
        .then(roomFromDB => res.render("room-details",roomFromDB))
        .catch((err) => next(err))
})


module.exports = router