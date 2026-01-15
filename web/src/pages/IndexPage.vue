<template>
  <q-page class="page column">
    <div class="col column items-center justify-center">
      <div class="page__content column items-center">
        <q-img
          class="image--logo"
          height="96px"
          width="96px"
          src="logo.svg"
          alt="Word Search Logo"
          style="transform: rotate(-5deg)"
        />
        <div class="title">
          <span class="text-bold">WORD</span>
          <span class="text-bold">SEARCH</span>
        </div>
        <div>
          <span class="introduce text-bold text-grey">尋找隱藏在網格中的詞句吧！</span>
        </div>
        <q-btn
          to="/subjects"
          label="開始遊戲"
          class="btn--start-game full-width"
          size="1.2rem"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

  const soundOn = ref(true);

  function toggleSound() {
    soundOn.value = !soundOn.value;
  }
</script>

<style lang="scss" scoped>
$screen-sm: 480px;

.page {
  padding: 10px;

  .page__content {
    gap: 10px;

    .title {
      padding: 10px;

      span {
        font-size: 3.5rem;

        @media screen and (max-width: $screen-sm) {
          font-size: 2.5rem;
        }

        &:last-child {
          background: linear-gradient(to bottom, $brand, $brand-1, $brand-2);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }

    .introduce {
      font-size: 1.3rem;

      @media screen and (max-width: $screen-sm) {
        font-size: 1rem;
      }
    }

    .btn--start-game {
      margin-top: 50px;
      border-radius: 10px;
      color: white;
      background-color: $brand;
    }
  }
}
</style>
