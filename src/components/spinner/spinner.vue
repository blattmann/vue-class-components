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
  --spinner-speed-show: 0ms;
  --spinner-speed-animation: 500ms;
  --spinner-border-radius: 50%;
  --spinner-background-color: rgba(255, 255, 255, 1);
}

.tv-spinner {
  background: var(--spinner-background-color);
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
  animation: nuxtLoadingIn var(--spinner-speed-show) ease;
  animation-fill-mode: forwards;
  overflow: hidden;

  & > div {
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border: 0.5rem solid #f5f5f5;
    border-left: 0.5rem solid #fff;
    transform: translateZ(0);
    animation: nuxtLoading var(--spinner-speed-animation) infinite linear;
  }

  & > div,
  & > div:after {
    border-radius: var(--spinner-border-radius);
    width: 5rem;
    height: 5rem;
  }
}

@keyframes nuxtLoading {
  0% {
    transform: rotate(0deg);
  }
  100% {
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
