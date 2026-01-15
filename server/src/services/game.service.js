class GameService {
  constructor(gameModel) {
    this.gameModel = gameModel;
  }

  async get_all_game_subjects() {
    const result = await this.gameModel.get_all_game_subjects();
    if (!result || result.length === 0)
      throw Object.assign(new Error("No game subjects found"), {
        code: "NOT_FOUND",
      });
    return result;
  }

  async get_levels_by_subject(subject_id) {
    const result = await this.gameModel.get_levels_by_subject(subject_id);
    if (!result || result.length === 0)
      throw Object.assign(new Error("No levels found for the subject"), {
        code: "NOT_FOUND",
      });
    return result;
  }

  async get_game_data(level_id) {
    const result = await this.gameModel.get_game_data(level_id);
    if (!result)
      throw Object.assign(new Error("No game data found for the level"), {
        code: "NOT_FOUND",
      });
    return result;
  }
}

module.exports = GameService;