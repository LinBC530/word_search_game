const express = require("express");
const router = express.Router();
const { celebrate, Joi, Segments } = require("celebrate");
const pool = require("../configs/mysqlPool");
const GameModel = require("../models/game.model");
const GameService = require("../services/game.service");
const GameController = require("../controllers/game.controller");

const game_controller = new GameController(new GameService(new GameModel(pool)));

// 取得遊戲資訊列表
router.get(
  "/subjects",
  async (req, res, next) => await game_controller.get_all_game_subjects(req, res, next)
);

// 取得遊戲資訊
router.get(
  "/subjects/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
          "number.base": "遊戲編號必須為數字",
          "number.min": "遊戲編號必須大於 0",
        }),
    }),
  }),
  async (req, res, next) => await game_controller.get_levels_by_subject(req, res, next)
);

router.get(
  "/levels/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
          "number.base": "關卡編號必須為數字",
          "number.min": "關卡編號必須大於 0",
        }),
    }),
  }),
  async (req, res, next) => await game_controller.get_game_data(req, res, next)
);

module.exports = router;