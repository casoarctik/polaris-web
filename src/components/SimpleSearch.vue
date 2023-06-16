<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

    const emit = defineEmits(['simpleResults']);
    const simpleQuery = ref('')
    const typeItem = ref(0)

    function simpleSearch() {
      axios
        .get(`http://localhost:8080/movieDb/search?word=${simpleQuery.value}`)
        .then((response) => {
          emit('simpleResults', response.data)
        })
    }

</script>

<template>
  <div class="simple-search">
    <label for="search">Rechercher :</label>
    <input id="search" v-model="simpleQuery" @keypress.enter="simpleSearch" type="text" placeholder="Rechercher quelque chose ..." />
    <select name="typeItem" id="typeItem" v-model="typeItem">
      <option value="0">Tous</option>
      <option value="1">Film</option>
      <option value="2">Série</option>
      <option value="3">Personne</option>
    </select>
    <button @click="simpleSearch">Rechercher</button>
  </div>
</template>

<style scoped>
.results {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.items {
  width: 18%;
  margin-bottom: 20px;
}

.arrow-icon {
  display: inline-block;
  width: 0;
  height: 0;
  margin-right: 10px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 10px solid black;
  cursor: pointer;
}

.arrow-icon.open {
  border-top: 6px solid black;
  border-bottom: none;
  border-left: 10px solid transparent;
}

.arrow-icon.closed {
  border-top: none;
  border-bottom: 6px solid black;
  border-left: 10px solid transparent;
}
</style>
