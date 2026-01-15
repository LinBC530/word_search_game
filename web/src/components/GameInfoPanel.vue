<template>
  <div class="info column">
    <div class="info__summary row full-width">
      <div class="info__block col column">
        <div class="text-h5 text-bold">Found</div>
        <div>
          <span class="text-h6">{{ found }}</span>
          <span class="text-h6">/{{ props.words.length }}</span>
        </div>
      </div>
      <div class="info__block col column">
        <div class="text-h5 text-bold">Miss</div>
        <div>
          <span class="text-h6">{{ props.miss }}</span>
        </div>
      </div>
    </div>

    <div class="level-info column">
      <div class="level-info__title row">
        <q-icon name="img:src/assets/word.png" size="25px" />
        <span>{{ props.subject }}</span>
      </div>
    </div>

    <div class="words">
      <div
        class="words_item row items-center"
        v-for="word in props.words"
        :key="word"
      >
        <q-icon
          :name="word.found ? 'check_circle' : 'question_mark'"
          :color="word.found ? 'green' : 'grey'"
        />
        <span>{{ word.context }}</span>
      </div>
    </div>

    <q-space />

    <q-btn
      color="grey-2"
      text-color="black"
      icon="replay"
      label="重新開始"
      @click="emit('restart')"
    />
    <q-btn
      color="primary"
      icon="exit_to_app"
      label="離開遊戲"
      @click="emit('exit')"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  subject: String,
  words: Array,
  miss: Number,
});

const emit = defineEmits(["restart", "exit"]);

const found = computed(
  () => props.words.filter((word) => word.found === true).length
);
</script>

<style lang="scss" scoped>
.page {
  .info {
    height: 100%;
    width: clamp(300px, 40vw, 400px);
    min-width: 300px;
    padding: 15px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 15px;

    .info__summary {
      gap: 20px;

      .info__block {
        padding: 10px;
        border: 3px solid #eee;
        border-radius: 10px;
        gap: 10px;

        &:first-child {
          span {
            &:first-child {
              font-size: 2.5rem;
              font-weight: bold;
              color: green;
            }

            &:last-child {
              font-size: 1.5rem;
              color: #666;
            }
          }
        }

        &:last-child {
          span {
            font-size: 2.5rem;
            font-weight: bold;
            color: red;
          }
        }
      }
    }
    @media screen and (max-width: 681px) {
      width: calc(100vw - 30px);
      min-width: none;
    }
  }

  .level-info {
    gap: 5px;

    .level-info__title {
      font-size: 1.2rem;
      font-weight: bold;
      gap: 10px;
      align-items: center;
    }

    .level-info__content {
      color: #666;
    }
  }

  .words {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    .words_item {
      padding: 5px;
      gap: 10px;
      font-size: 1.1rem;
      border: 2px solid #ccc;
      border-radius: 10px;
    }
  }
}
</style>
