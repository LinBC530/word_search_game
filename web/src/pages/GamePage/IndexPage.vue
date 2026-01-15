<template>
  <GamePlayingPage v-if="!isFinished" />
  <GameFinshPage v-else />
</template>

<script setup>
import GamePlayingPage from "./GamePlayingPage.vue";
import GameFinshPage from "./GameFinshPage.vue";
import { useGameStore } from "src/stores/GameStore";
import { storeToRefs } from "pinia";
import { onUnmounted } from "vue";

const gameStore = useGameStore();
const { isFinished } = storeToRefs(gameStore);

onUnmounted(() => {
  gameStore.$reset();
});
</script>
