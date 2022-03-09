<template>
  <v-main class="content">
    <v-responsive class="mx-auto overflow-visible">
      <v-container>
        <v-responsive class="overflow-visible" min-height="80vh">
          <v-fade-transition mode="out-in">
            <nuxt />
          </v-fade-transition>
        </v-responsive>
      </v-container>
    </v-responsive>
  </v-main>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

/**
 *  @desc -
 *
 *  @author Front End Dev @Certipath
 *
 *  Mon Jun 29 13:26:50 EDT 2020
 */
@Component({})
export default class TvmainView extends Vue {}
</script>
