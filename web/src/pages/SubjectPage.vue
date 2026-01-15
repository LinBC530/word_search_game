<template>
  <q-page class="page column content-center q-gutter-md">
    <div class="title">
      <span class="text-h4 text-bold">主題</span>
    </div>
    <div class="subjects">
      <q-card
        class="subjects__card cursor-pointer"
        :class="cardBgColors[index % cardBgColors.length]"
        style="aspect-ratio: 1 / 1"
        v-for="(subject, index) in subjects"
        :key="subject.id"
        @click="$router.push(`/subjects/${subject.id}`)"
      >
        <q-card-section class="flex flex-center fit">
          <div class="text-h5 text-bold text-white">{{ subject.name }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { get_all_game_subjects } from "src/api/GameService";
import { onBeforeMount, ref } from "vue";
import { Notify } from "quasar";

const cardBgColors = [
  'bg-blue-6',
  'bg-amber-6',
  'bg-teal-6',
  'bg-deep-orange-6',
  'bg-indigo-6',
  'bg-lime-6',
  'bg-purple-6',
  'bg-green-6',
  'bg-pink-6',
  'bg-blue-grey-6',
  'bg-cyan-6',
  'bg-brown-6',
  'bg-light-blue-6',
  'bg-orange-6',
  'bg-deep-purple-6',
  'bg-light-green-6',
  'bg-red-6',
  'bg-grey-6'
]

const subjects = ref([]);

onBeforeMount(async () => {
  subjects.value = await fatch_data();
});

async function fatch_data() {
  try {
    const res = await get_all_game_subjects();
    return res.data;
  } catch (err) {
    Notify.create({
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
  }

  .subjects {
    width: 1440px;
    max-width: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;

    .subjects__card {
      background-color: rgb(181, 0, 0);
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
