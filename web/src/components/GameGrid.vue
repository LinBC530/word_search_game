<template>
  <div class="grid column" style="aspect-ratio: 1 / 1">
    <div
      class="grid__row col row no-wrap full-width justify-center"
      v-for="row in grid_size"
      :key="row"
    >
      <q-btn
        padding="5px"
        style="aspect-ratio: 1/1"
        class="grid__col text-box"
        v-for="col in grid_size"
        :key="col"
        @click="check_word_place(row - 1, col - 1)"
        unelevated
        :color="grid[row - 1][col - 1].color"
        :disable="grid[row - 1][col - 1].selected"
      >
        <template v-slot:default>
          <span class="square-content">
            {{ grid[row - 1][col - 1].context }}
          </span>
        </template>
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  grid_size: { type: Number, default: 15 },
  words: { type: Array, default: [] },
});

const emit = defineEmits(["select"]);

const grid_size = props.grid_size;
const words = ref([]);

const directions = [
  { name: "up", row_col: [-1, 0] },
  { name: "down", row_col: [1, 0] },
  { name: "right", row_col: [0, 1] },
  { name: "left", row_col: [0, -1] },
  { name: "up right", row_col: [-1, 1] },
  { name: "up left", row_col: [-1, -1] },
  { name: "down right", row_col: [1, 1] },
  { name: "down left", row_col: [1, -1] },
];

const grid = ref(
  Array.from({ length: grid_size }, () =>
    Array.from({ length: grid_size }, () => ({
      context: "",
      selected: false,
      word: null,
    }))
  )
);

let initialized = false;
watch(
  () => props.words,
  (newWords) => {
    if (!newWords.length || initialized) return;

    set_grid_data();
    console.log(words.value);
    initialized = true;
  },
  { immediate: true }
);

// 設置網格內文字資料
function set_grid_data() {
  words.value = props.words.map((word) => ({
    context: word,
    found: false,
    coordinates: [],
  }));
  console.log(words.value);
  // 放置句子至網格
  words.value.forEach(({ context }) => place_word(context));

  // 填充剩餘網格文字
  grid.value.forEach((arr, row) =>
    arr.forEach((text, col) => {
      if (!text.context)
        grid.value[row][col] = {
          context: getRandomChar(),
          selected: false,
          word: null,
        };
    })
  );
}

// 取得隨機句子中隨機字元
function getRandomChar() {
  let randomWord =
    words.value[Math.floor(Math.random() * words.value.length)].context;
  let randomChar = randomWord[Math.floor(Math.random() * randomWord.length)];
  return randomChar;
}

// 檢查放置位置是否衝突，輸入參數句子(word)、座標位置(row, col)、方向(direction)
function canPlaceWord(word, row, col, direction) {
  const { row_col } = directions.find((dir) => dir.name === direction);
  const [rowInc, colInc] = row_col;

  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * rowInc;
    const newCol = col + i * colInc;

    // 檢查是否在範圍內
    if (
      newRow < 0 ||
      newRow >= grid_size ||
      newCol < 0 ||
      newCol >= grid_size ||
      grid.value[newRow][newCol].context !== ""
    ) {
      return false;
    }
  }
  return true;
}

// 放置句子至網格，輸入參數句子(word)
function place_word(word) {
  let total = 0;
  let coordinates = [];
  let row, col, direction;

  // 隨機找尋可放置句子的位置，最多執行50次
  while (total < 50) {
    row = Math.floor(Math.random() * grid_size);
    col = Math.floor(Math.random() * grid_size);
    direction = directions[Math.floor(Math.random() * directions.length)];
    if (canPlaceWord(word, row, col, direction.name)) break;
    total++;
  }
  if (total >= 50) {
    console.error("無法放置句子");
    confirm("多次放置句子失敗，是否重新整理頁面？")
      ? router.go(0)
      : router.replace("/games");
    return;
  }

  // 放置句子，並記錄座標
  const [rowInc, colInc] = direction.row_col;
  word.split("").forEach((text) => {
    grid.value[row][col] = { context: text, selected: false, word: word };
    coordinates.push({ row: row, col: col });
    row += rowInc;
    col += colInc;
  });
  words.value.find((w) => w.context === word).coordinates = coordinates;
}

// 檢查選取區塊是否為句子放置區塊
function check_word_place(row, col) {
  console.log(grid.value[row][col]);
  const sentence = words.value.find((word) =>
    word.coordinates.some(
      (coordinate) => coordinate.row === row && coordinate.col === col
    )
  );

  // 選取區塊為句子放置區塊，顯示為綠色，否則為紅色
  console.log(sentence);
  if (sentence) {
    sentence.found = true;
    sentence.coordinates.forEach((word_coordinate) => {
      grid.value[word_coordinate.row][word_coordinate.col].color = "green";
      grid.value[word_coordinate.row][word_coordinate.col].selected = true;
    });
  } else {
    grid.value[row][col].color = "red";
    grid.value[row][col].selected = true;
  }

  emit("select", {
    word: sentence ? sentence.context : null,
  });
}
</script>

<style lang="scss" scoped>
.page {
  .grid {
    width: 100%;
    max-width: 80vh;
    min-height: 300px;
    min-width: 300px;
    padding: 10px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    aspect-ratio: 1 / 1;

    gap: 5px;
    .grid__row {
      gap: 5px;
    }
  }
}

.square-content {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 1em;
  aspect-ratio: 1 / 1;
  font-size: clamp(12px, 3vw, 18px);
}
</style>
