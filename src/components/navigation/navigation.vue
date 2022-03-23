<template>
  <nav class="tv-navigation__wrapper elevation-24">
    <ul v-if="navi && navi.Navigation" class="tv-navigation__list pl-0">
      <li
        v-for="item in navi.Navigation"
        :key="item.url"
        :class="[
          'tv-navigation__item',
          item.url !== navi.ActivePage || 'tv-navigation__item--active'
        ]"
      >
        <nuxt-link
          :to="item.url"
          :class="[
            `tv-navigation__title hoverFrom${hoverFx}`,
            item.url !== navi.ActivePage || 'tv-navigation__title--active'
          ]"
          @click="activateLoading()"
        >
          {{ item.title }}
        </nuxt-link>
      </li>
      <li
        v-if="navi.BackLink"
        class="tv-navigation__item tv-navigation__item--right"
      >
        <a
          href=""
          :class="`tv-navigation__title hoverFrom${hoverFx}`"
          @click.prevent="$router.back()"
          >Go Back</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

// Vuex
import { State } from 'vuex-class'

/**
 *  TvNavigation
 *
 *  @desc -
 *
 *  @author Front End Dev @Certipath
 *
 *  Mon Mar 7 09:00:00 MST 2022
 */
@Component({})
export default class TvNavigation extends Vue {
  // Component data
  hoverFx = 'Center' // Left, Right, Center

  @State('navi', { namespace: 'navigationState' })
  navi

  activateLoading() {
    // App loading
    this.$store.commit('appState/setloading', true)
  }
}
</script>

<style lang="postcss">
:root {
  --hover-border-color: #ea215a;
  --hover-border-width: 2px;
  --hover-bottom-distance: 0px;
  --background-color: rgba(255, 255, 255, 1);
}

.tv-navigation {
  &__wrapper {
    padding: 20px;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: var(--background-color);
  }

  &__list {
    list-style-type: none;
  }

  &__item {
    display: inline;
    margin-right: 10px;

    &--right {
      float: right;
    }

    &--active {
      font-weight: 800;
    }
  }

  &__title {
    text-decoration: none;
    display: inline-block;
    background-image: linear-gradient(
      var(--hover-border-color),
      var(--hover-border-color)
    );
    background-size: 0% var(--hover-border-width);
    background-repeat: no-repeat;
    transition: background-size 0.3s;
    margin: 5px 0;

    &:hover {
      text-decoration: none;
      background-size: 100% var(--hover-border-width);
    }

    &--active {
      text-decoration: none;
      background-size: 100% var(--hover-border-width);
      pointer-events: none;
    }
  }
}

/* Hover FX */
.hoverFromCenter {
  background-position: 50% calc(100% - var(--hover-bottom-distance));
}

.hoverFromLeft {
  background-position: 0 calc(100% - var(--hover-bottom-distance));
}

.hoverFromRight {
  background-position: 100% calc(100% - var(--hover-bottom-distance));
}
</style>
