<template>
  <q-page class="page column flex-center q-pa-md">
    <div class="page__icon">
      <q-icon name="emoji_events" size="64px" color="white" />
    </div>

    <div class="column items-center">
      <div class="text-h3 text-bold">Finish</div>
      <div class="text-h6 text-bold text-grey">您已完成該關卡</div>
    </div>

    <div class="page__stats row justify-between">
      <div class="page__stat col column items-center q-pa-md">
        <q-icon name="timer" size="32px" color="grey-5" />
        <div class="stat__title text-bold">用時</div>
        <div class="stat__content col flex flex-center text-bold">
          <span>{{ timer }}</span>
        </div>
      </div>
      <div class="page__stat col column items-center q-pa-md">
        <q-icon name="circle" size="32px" color="grey-5" />
        <div class="stat__title text-bold">找到的字</div>
        <div class="stat__content col flex flex-center">
          <div>
            <span class="text-bold text-green">{{ found }}</span>
            <span class="text-bold">/{{ words.length }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="page__actions row">
      <q-btn
        class="action__btn"
        color="primary"
        icon="replay"
        label="重新開始"
        padding="10px"
        @click="gameStore.$reset()"
      />
      <q-btn
        class="action__btn"
        text-color="black"
        color="white"
        icon="home"
        label="回到選單"
        padding="10px"
        to="/subjects"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useGameStore } from "src/stores/GameStore";
import { storeToRefs } from "pinia";
import { onUnmounted } from "vue";

const gameStore = useGameStore();
const { words, found, timer } = storeToRefs(gameStore);

onUnmounted(() => {
  gameStore.$reset();
});
</script>

<style scoped>
.page {
  gap: 20px;

  .page__icon {
    padding: 20px;
    border-radius: 100px;
    background-color: rgb(255, 174, 0);
  }

  .page__stats {
    width: 100%;
    max-width: 568px;
    gap: 20px;

    .page__stat {
      gap: 5px;
      aspect-ratio: 1.5 / 1;
      min-width: 214px;
      border-radius: 10px;
      background-color: rgba(0, 190, 0, 0.1);
      box-shadow: 0 10px 0 rgb(0, 190, 0);

      .stat__title {
        font-size: 20px;

        @media screen and (max-width: 479px) {
          font-size: 36px;
        }

        @media screen and (max-width: 349px) {
          font-size: 24px;
        }
      }

      .stat__content {
        font-size: 30px;

        @media screen and (max-width: 479px) {
          font-size: 48px;
        }

        @media screen and (max-width: 349px) {
          font-size: 28px;
        }
      }

      &:first-child {
        background-color: rgba(0, 123, 255, 0.1);
        box-shadow: 0 10px 0 rgb(0, 123, 255);
      }

      &:last-child {
        background-color: rgba(0, 190, 0, 0.1);
        box-shadow: 0 10px 0 rgb(0, 190, 0);

        .stat__content {
          span:first-child {
            font-size: 45px;
            margin-right: 10px;

            @media screen and (max-width: 479px) {
              font-size: 65px;
            }

            @media screen and (max-width: 349px) {
              font-size: 28px;
            }
          }
        }
      }
    }
  }

  .page__actions {
    margin-top: 30px;
    gap: 20px;
    width: 100%;
    max-width: 568px;

    .action__btn {
      width: 100%;

      @media screen and (max-width: 479px) {
        padding: 20px;
      }
    }
  }
}
</style>
