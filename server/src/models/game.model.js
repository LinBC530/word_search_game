class GameModel {
  constructor(pool) {
    this.pool = pool;
  }

  async get_all_game_subjects() {
    const [result] = await this.pool.query(
      `
      SELECT * FROM wordsearchgame.game_groups
      `
    );
    return result;
  }

  async get_levels_by_subject(subject_id) {
    const [result] = await this.pool.query(
      `
        SELECT id, name FROM wordsearchgame.games WHERE group_id = ?
        `,
      [subject_id]
    );
    return result;
  }

  async get_game_data(level_id) {
    const [[result]] = await this.pool.query(
      `
        SELECT
            games.id,
            games.name,
            games.data,
            game_groups.name AS subject_name
        FROM wordsearchgame.games
        LEFT JOIN wordsearchgame.game_groups ON games.group_id = game_groups.id
        WHERE games.id = ?
        `,
      [level_id]
    );
    return result;
  }
}

module.exports = GameModel;
