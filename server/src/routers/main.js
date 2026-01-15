const express = require("express");
const router = express.Router();
const { errors } = require("celebrate");
const { errorHandler } = require("../middleware/errorHandl.js");

const game = require("./game.router.js");

router.use("/games", game);
router.use(errorHandler);
router.use(errors());

module.exports = router;
