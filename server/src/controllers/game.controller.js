class GameController {
  constructor(gameService) {
    this.gameService = gameService;
  }

  async get_all_game_subjects(req, res, next) {
    try {
      const subjects = await this.gameService.get_all_game_subjects();
      res.status(200).json(subjects);
    } catch (err) {
      next(err);
    }
  }

  async get_levels_by_subject(req, res, next) {
    try {
      const levels = await this.gameService.get_levels_by_subject(req.params.id);
      res.status(200).json(levels);
    } catch (err) {
      next(err);
    }
  }

  async get_game_data(req, res, next) {
    try {
      const gameData = await this.gameService.get_game_data(req.params.id);
      res.status(200).json(gameData);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = GameController;