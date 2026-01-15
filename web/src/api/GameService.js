import { api } from "src/boot/axios";

// 取得遊戲資料
export const get_game_data = async (id) => await api.get(`/games/levels/${id}`);

// 取得遊戲
export const get_levels_by_subject = async (id) => await api.get(`/games/subjects/${id}`)

// 依分組取得遊戲列表
export const get_all_game_subjects = async () => api.get(`/games/subjects`);
