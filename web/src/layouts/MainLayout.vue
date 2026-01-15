<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-transparent text-black">
      <q-toolbar>
        <div>
          <q-img
            class="cursor-pointer"
            src="labellogo.svg"
            alt="Logo"
            fit="contain"
            height="50px"
            width="auto"
            style="aspect-ratio: 4 / 1"
            @click="() => $router.push('/')"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>
