<script setup lang="ts">
import axios from 'axios'
import type { Catalogue } from '@/interfaces/Catalogue'
import { inject } from 'vue';

const emit = defineEmits(['newPageResults']);
const results = inject('results') as Catalogue;

function previousPage(page: number) {
    if (results) {
        let newPage = page - 1
        if (newPage >= 1) {
            axios
                .get(`http://localhost:8080/movieDb/nextPage?pageNumber=${newPage}&pageSize=10`)
                .then((response) => {
                    emit('newPageResults', response.data)
                })
        }
    }
}


function nextPage(page: number, totalPages: number) {

    if (results) {
        let newPage = page + 1
        if (newPage <= totalPages) {
            axios
                .get(`http://localhost:8080/movieDb/nextPage?pageNumber=${newPage}&pageSize=10`)
                .then((response) => {
                    emit('newPageResults', response.data)
                })
        }
    }
}


</script>

<template>
    <div class="pagination" v-if="results">
        <button @click="previousPage(results.page)">⬅️</button>
        <p>Page : {{ results.page }} sur {{ results.totalPages }}</p>
        <button @click="nextPage(results.page, results.totalPages)">➡️</button>
    </div>
</template>