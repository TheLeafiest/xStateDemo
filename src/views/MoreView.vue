<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="more">
    <div class="more__nav">
      <ul class="nav nav-pills nav-stacked">
        <li class="nav-link" role="presentation">
          <RouterLink :to="{ name: 'more' }">- More!</RouterLink>
        </li>
        <li class="nav-link" role="presentation">
          <RouterLink :to="{ name: 'formDemo' }">- Form Demo</RouterLink>
        </li>
        <li class="nav-link" role="presentation">
          <RouterLink :to="{ name: 'authDemo' }">- Auth Demo</RouterLink>
        </li>
      </ul>
    </div>

    <div class="more__content">
      <RouterView v-slot="{ Component }">
        <transition name="slide-y-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .more {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 3rem;
  }
  .more__nav {
    width: 30%;
  }
  .more__content {
    width: 70%;
    min-height: 100vh;
    background-color: hsla(160, 100%, 37%, 1);
  }
  .nav-link a:hover {
    transition: font-size 0.3s linear;
    font-size: 4rem;
    background-color: transparent;
  }
}
</style>
