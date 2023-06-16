<script setup lang="ts">
import type { Catalogue } from '@/interfaces/Catalogue';
import { inject } from 'vue';
import ResultItem from './ResultItem.vue';

const results = inject('results') as Catalogue;

</script>

<template>
  <div class="results" v-if="results">
    <div class="sorters">
      <button>Date</button>
      <button>Genre</button>
      <button>Popularité</button>
    </div>
    <div v-for="item in results.results" :key="item.id" class="items">
      <ResultItem :item="item"></ResultItem>
    </div>
  </div>
</template>