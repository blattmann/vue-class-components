<template>
  <div class="tv-spinner" aria-live="polite" role="status">
    <div>Loading...</div>
    <!-- https://projects.lukehaas.me/css-loaders -->
  </div>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

/**
 *  TvSpinner
 *
 *  @desc -
 *
 *  @author Front End Dev @Certipath
 *
 *  Mon Mar 10 09:00:00 MST 2022
 */
@Component({})
export default class TvSpinner extends Vue {
  // Component data
  // hoverFx = 'Center' // Left, Right, Center
  // Computed property
  // getActiveItem() {
  //   return this.$nuxt.$route.path
  // }
}
</script>

<style lang="postcss">
:root {
  --speed-show: 0ms;
  --speed-animation: 500ms;
}

.tv-spinner {
  background: white;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: nuxtLoadingIn var(--speed-show) ease;
  animation-fill-mode: forwards;
  overflow: hidden;
}

.tv-spinner > div,
.tv-spinner > div:after {
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
}

.tv-spinner > div {
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border: 0.5rem solid #f5f5f5;
  border-left: 0.5rem solid #fff;
  transform: translateZ(0);
  animation: nuxtLoading var(--speed-animation) infinite linear;
}

@keyframes nuxtLoading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes nuxtLoadingIn {
  0% {
    visibility: hidden;
    opacity: 0;
  }
  20% {
    visibility: visible;
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
}
</style>
