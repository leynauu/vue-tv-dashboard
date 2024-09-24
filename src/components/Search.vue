<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 mt-n8">
        <i class="fas fa-video text-secondary fa-5x"></i>
      </div>
      <div class="col-12">
        <div class="input-group input-group-lg">
          <input type="text" class="form-control border" v-model="query" placeholder="TV şovu ara..." />
          <div class="input-group-append">
            <button class="btn btn-dark border" @click="searchShows">Ara</button>
          </div>
        </div>
      </div>
      <div class="col-12 px-4">
        <div class="row justify-content-center" v-if="query.length && filteredShows.length">
          <div class="col-md-2 col-6 p-3 border" v-for="show in filteredShows" :key="show.id">
            <div class="text-center mb-4" v-if="show.image">
              <img :src="show.image.medium" :alt="show.name" style="width:100%; height: auto;" />
            </div>
            <a class="text-light text-decoration-none" href="#" @click="selectShow(show)">{{ show.name }}</a>
            <div class="border-bottom my-2"></div>
            <p class="text-light mb-1"><small> {{ show.premiered ? new Date(show.premiered).toLocaleDateString('tr-TR',
              { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'Bilinmiyor' }}</small></p>
            <p class="text-secondary" v-if="show.rating.average">Puan: {{ show.rating.average }}</p>
            <p class="text-light" v-else>Puan bilgisi yok</p>
          </div>
        </div>
        <div v-if="query.length && !filteredShows.length">
          <p>Aradığınız şov bulunamadı.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AppSearch',
  data() {
    return {
      query: "",
      filteredShows: [],

    };
  },
  methods: {
    async searchShows() {
      if (this.query.length > 0) {
        try {
          const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${this.query}&limit=12`);
          this.filteredShows = response.data.map(result => result.show);
        } catch (error) {
          console.error('API çağrısı başarısız:', error);
        }
      } else {
        this.filteredShows = [];
      }
      this.$emit('update:filteredShows', this.filteredShows);
    },
    selectShow(show) {
      this.$emit('select-show', show);
    }
  }
};
</script>
