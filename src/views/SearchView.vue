<script setup lang="ts">
import AdvancedSearch from '@/components/AdvancedSearch.vue';
import SimpleSearch from '@/components/SimpleSearch.vue'
import SearchResults from '@/components/SearchResults.vue';
import SearchPagination from '@/components/SearchPagination.vue';
import { provide, ref } from 'vue';
import type { Catalogue } from '@/interfaces/Catalogue';

const isSimpleSearch = ref(true);
const searchTextToToggle = ref("Je n'ai pas de titre en tête, faisons une recherche avancée");
const results = ref<Catalogue>();

function receiveSimpleResults(simpleResults: Catalogue) {
  console.log("ff")
  results.value = simpleResults
}
function receiveResultsAdvanced(resultsAdvanced: Catalogue) {
  results.value = resultsAdvanced
}
function receiveNewPageResults(newPageResults: Catalogue) {
  
  results.value = newPageResults
}

function toggleSearchType() {
  isSimpleSearch.value = !isSimpleSearch.value;
  if (isSimpleSearch.value) {
    searchTextToToggle.value = "Je n'ai pas de titre en tête, faisons une recherche avancée";
  } else {
    searchTextToToggle.value = "Revenons plutôt à une recherche simple, par mot-clé";
  }
}

provide('results', results);


</script>

<template>
  <div class="search-type">
    <SimpleSearch v-if="isSimpleSearch" @simpleResults="receiveSimpleResults"></SimpleSearch>
    <AdvancedSearch v-if="!isSimpleSearch" @resultsAdvanced="receiveResultsAdvanced"></AdvancedSearch>
  </div>
  <div class="switch-search">
    <button @click="toggleSearchType">{{ searchTextToToggle }}</button>
  </div>
  <SearchResults></SearchResults>
  <SearchPagination @newPageResults="receiveNewPageResults"></SearchPagination>
</template>
