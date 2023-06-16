<script setup lang="ts">
import type { Genre } from '@/interfaces/Genre'
import axios from 'axios'
import { onMounted, ref } from 'vue'

interface DateButton {
  name: string;
  id: string;
}
const typeItem = ref('')
const genres = ref<Genre[]>([])
let filteredGenres = ref<Genre[]>([])
const selectedGenres = ref<number[]>([])
const decadesList = ref<DateButton[]>([
  {
    name: 'avant 1950',
    id: 'before50s'
  },
  {
    name: 'années 50',
    id: '50s'
  },
  {
    name: 'années 60',
    id: '60s'
  },
  {
    name: 'années 70',
    id: '70s'
  },
  {
    name: 'années 90',
    id: '90s'
  },
  {
    name: 'années 2000',
    id: '2000s'
  },
  {
    name: 'années 2010',
    id: '2010s'
  },
  {
    name: 'années 2020',
    id: '2020s'
  }
])
const datesOnAYearList = ref<DateButton[]>([
  {
    name: '12 mois',
    id: '12-months'
  },
  {
    name: '6 mois',
    id: '6-months'
  },
  {
    name: '3 mois',
    id: '3-months'
  },
  {
    name: '1 mois',
    id: '1-month'
  },
  {
    name: '2 semaine',
    id: '2-weeks'
  },
  {
    name: '1 semaine',
    id: '1-week'
  },
  {
    name: '1 jour',
    id: '1-day'
  }
])

function getGenres() {
  axios.get('http://localhost:8080/movieDb/genre').then((response) => {
    genres.value = response.data
  })
}

onMounted(() => { getGenres() });

function selectItem(type: string) {
  if (type === "movie") {
    filteredGenres.value = genres.value.filter(
      (genre) => genre.type == 0 || genre.type == 1
    )
    typeItem.value = type
  } else if (type === "tv") {
    filteredGenres.value = genres.value.filter(
      (genre) => genre.type == 0 || genre.type == 2
    )
  }
  typeItem.value = type
  selectedGenres.value = []
}

function selectGenres(id: number) {
  if (selectedGenres.value.length >= 0 && selectedGenres.value.length < 3 && !selectedGenres.value.includes(id)) {
    selectedGenres.value?.push(id)
    console.log(selectedGenres)
  }
}

function resetfilters(){
  typeItem.value = '';
  selectedGenres.value = []
}

function advancedSearch() {
  axios
    .post('http://localhost:8080/movieDb/advancedSearch', null, {
      params: {
        word: props.keyword,
        type: typeItem.value,
        genre: encodeURIComponent(selectedGenres.value.toString()),
        beforeDate: null,
        afterDate: null
      }
    })
    .then((response) => {
      emit('resultsAdvanced', response.data)
    })
    .catch(function (error) {
      console.log(error)
    })

}
</script>

<template>
  <div class="advanced-search">
    <div class="choose-type">
      <button class="button-type" id="movie" @click="selectItem('movie')">Film</button>
      <button class="button-type" id="tv" @click="selectItem('tv')">Série</button>
    </div>
    <div class="choose-genre">
      <button v-for="genre in filteredGenres" :key="genre.id"
        :class="'button-genre ' + genre.name + ' ' + { 'disabled': selectedGenres.length >= 3 && !selectedGenres.includes(genre.id) }"
        @click="selectGenres(genre.id)" :disabled="selectedGenres.length >= 3 && !selectedGenres.includes(genre.id)"
        :id="'genre-' + genre.id.toString">
        {{ genre.name }}
      </button>
    </div>
    <div class="choose-date">
      <div class="decade-date">
        <p>Par décénnies :</p>
        <button v-for="decade in decadesList" :key="decade.id"
        class="button-decade"
        :id="decade.id">
        {{ decade.name }}
        </button>
      </div>
      <div class="onAYear-date">
        <p>Sur une période de 12 mois:</p>
        <button v-for="date in datesOnAYearList" :key="date.id"
        class="button-onAYear"
        :id="date.id">
        {{ date.name }}
        </button>
      </div>
    </div>
    <a @click="resetfilters">Réinitialiser les filtres</a>
    <button @click="advancedSearch">Lancer la recherche avancée</button>
  </div>
</template>

<style scoped>
.button {
  background-color: #4CAF50;
  /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
