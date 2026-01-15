<template>
  <q-page class="page row">
    <div class="col column items-center grid-box">
      <div class="flex no-wrap items-center Timer-box">
        <q-icon name="timer" size="24px" color="blue" class="q-mr-sm" />
        <span class="text-h6 text-bold text-blue">{{ timer }}</span>
      </div>
      <div class="flex col flex-center full-width">
        <game-grid
          :grid_size="grid_size"
          :words="words_context"
          :key="grid_key"
          @select="grid_select_event"
        />
      </div>
    </div>

    <div class="info-box">
      <game-info-panel
        :subject="level_subject"
        :words="words"
        :miss="miss"
        @restart="restart_game"
        @exit="isFinished = true"
      />
    </div>
  </q-page>
</template>

<script setup>
import GameGrid from "src/components/GameGrid.vue";
import GameInfoPanel from "src/components/GameInfoPanel.vue";
import { get_game_data } from "src/api/GameService";
import { onBeforeMount, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Dialog } from "quasar";
import { useGameStore } from "src/stores/GameStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const gameStore = useGameStore();
const { startTimer, stopTimer, setWords } = gameStore;
const { words, words_context, miss, timer, isFinished, level_subject } =
  storeToRefs(gameStore);
const grid_size = 15;
const grid_key = ref(0);

onBeforeMount(async () => {
  const data = await fatch_data();
  if (!data) return;
  level_subject.value = data.name;
  setWords(data.data.sentence);
  startTimer();
});

onUnmounted(() => {
  stopTimer();
});

watch(
  () => words.value,
  (newWords) => {
    if (newWords.length === 0) return;
    const all_found = newWords.every((word) => word.found === true);
    if (all_found) {
      isFinished.value = true;
      stopTimer();
    }
  },
  { deep: true }
);

function grid_select_event(payload) {
  const { word } = payload;
  word
    ? (words.value.find((w) => w.context === word).found = true)
    : miss.value++;
}

async function fatch_data() {
  try {
    const res = await get_game_data(route.params.id);
    return res.data;
  } catch (err) {
    err.status === 404
      ? router.replace("/404")
      : Dialog.create({
          title: "Ops,發生了一些問題",
          message: "伺服器連線發生錯誤，請稍後再試。",
          ok: {
            label: "OK",
          },
          noBackdropDismiss: true,
          noEscDismiss: true,
        }).onOk(() => {
          router.replace("/subjects");
        });
  }
}

function restart_game() {
  stopTimer();
  const words_data = words.value.map((word) => word.context);
  grid_key.value++;
  gameStore.$reset();
  setWords(words_data);
  startTimer();
}
</script>

<style lang="scss" scoped>
.page {
  .grid-box {
    min-width: 332px;
    padding: 15px;
    gap: 10px;

    .Timer-box {
      padding: 5px 10px;
      border: 1px solid #ccc;
      border-radius: 50px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  .info-box {
    padding: 15px;
  }
}
</style>
