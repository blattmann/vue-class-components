<template>
  <nav class="tv-navigation__wrapper">
    <ul v-if="navi && navi.Navigation" class="tv-navigation__list pl-0">
      <li
        v-for="item in navi.Navigation"
        :key="item.url"
        :class="[
          'tv-navigation__item',
          item.url !== navi.ActivePage || 'tv-navigation__item--active'
        ]"
      >
        <a
          :href="item.url"
          :class="[
            `tv-navigation__title hoverFrom${hoverFx}`,
            item.url !== navi.ActivePage || 'tv-navigation__title--active'
          ]"
          @click="activateLoading()"
        >
          {{ item.title }}
        </a>
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

  @State('Navi', { namespace: 'navigationState' })
  navi

  // Computed property
  getActiveItem() {
    return this.$nuxt.$route.path
  }

  mounted() {
    // store current page
    this.$store.commit('navigationState/setActivePage', this.getActiveItem())
  }

  // Component method
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
}

.tv-navigation__list {
  list-style-type: none;
}

.tv-navigation__item {
  display: inline;
  margin-right: 10px;
}

.tv-navigation__item--active {
  font-weight: 800;
}

.tv-navigation__title {
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
}

.tv-navigation__title:hover {
  text-decoration: none;
  background-size: 100% var(--hover-border-width);
}

.tv-navigation__title--active {
  text-decoration: none;
  background-size: 100% var(--hover-border-width);
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
