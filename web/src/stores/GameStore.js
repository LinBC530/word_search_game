import { defineStore } from "pinia";

export const useGameStore = defineStore("gamestore", {
  state: () => ({
    level_subject: "",
    words: [],
    miss: 0,
    timer: "00:00:00",
    intervalId: null,
    isFinished: false,
  }),
  getters: {
    words_context: (state) => state.words.map((word) => word.context),
    found: (state) => state.words.filter((word) => word.found).length,
  },
  actions: {
    setWords(words) {
      this.words = words.map((word) => ({
        context: word,
        found: false,
      }));
    },

    startTimer() {
      const currentTime = new Date();
      const endTime = null;

      this.intervalId = window.setInterval(() => {
        const now = new Date();
        const diff = endTime ? endTime - now : now - currentTime;
        this.timer = this.formatDuration(diff);
      }, 1000);
    },

    formatDuration(ms) {
      const totalSeconds = Math.floor(ms / 1000);

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n) => String(n).padStart(2, "0");

      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    },

    stopTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
  },
});
