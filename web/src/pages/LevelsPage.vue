<template>
  <q-page class="page column content-center q-gutter-md">
    <div class="title column">
      <div><q-btn flat icon="arrow_back" label="返回主題" @click="$router.push('/subjects')" /></div>
      <span class="text-h4 text-bold">關卡</span>
    </div>
    <div class="levels">
      <q-card
        class="level-card cursor-pointer"
        v-for="level in levels"
        :key="level.id"
        @click="$router.push(`/levels/${level.id}`)"
      >
        <q-img src="~assets/item_default_image.png" />

        <q-card-section>
          <div class="text-bold">{{ level.name }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { get_levels_by_subject } from "src/api/GameService";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify } from "quasar";

const route = useRoute();
const router = useRouter();
const levels = ref([]);
onBeforeMount(async () => {
  levels.value = await fatch_data();
});

async function fatch_data() {
  console.log(route.params.id)
  try {
    const res = await get_levels_by_subject(route.params.id);
    return res.data;
  } catch (err) {
    err.status === 404
      ? router.replace("/404")
      : Notify.create({
          type: "negative",
          message: "伺服器連線發生錯誤，請稍後再試！",
        });
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 10px;

  .title {
    margin-top: 30px;
    gap: 10px;
  }

  .levels {
    width: 1440px;
    max-width: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;

    .level-card {
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }
    }
  }
}

.hover-card {
  transition: transform 0.25s ease;
}

.hover-card:hover {
  transform: scale(1.05);
}
</style>
