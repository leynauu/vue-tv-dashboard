<template>
  <AppHeader />
  <main id="main-content">
    <div class="content-section bg-cover bg-center py-10 mt-0" :style="{ backgroundImage: `url(${bgImage})` }">
      <div class="container py-5"></div>
    </div>
    <div class="content-section">
      <AppSearch @select-show="selectShow" @update:filteredShows="filteredShows = $event" />
    </div>
    <div class="content-section">
      <div class="container">
        <div class="row mt-5">
          <div class="col-md-4">
            <ul class="list-group">
              <li class="list-group-item bg-dark text-light border clickable-item" v-for="(shows, genre) in popularShowsByGenre" :key="genre"
                @click="updatePopularShows(genre)">
                <strong>{{ genre }}</strong>
              </li>
            </ul>
          </div>
          <div class="col-md-8">
            <AppPopularShows :popularShows="currentPopularShows" :selectShow="selectShow" />
          </div>
        </div>
        <ShowDetails v-if="selectedShow" :show="selectedShow" :onClose="closeModal" />
      </div>
    </div>
  </main>
  <AppFooter />
</template>

<script>
import axios from 'axios';
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import AppSearch from './components/Search.vue';
import ShowDetails from './components/ShowDetails.vue';
import background from './assets/background.jpg';
import AppPopularShows from './components/PopulerShows.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppSearch,
    ShowDetails,
    AppPopularShows,
  },
  data() {
    return {
      popularShowsByGenre: {},
      currentPopularShows: [],
      currentGenre: '',
      filteredShows: [],
      selectedShow: null,
      bgImage: background,
    };
  },
  created() {
    this.fetchPopularShows();
  },
  methods: {
    async fetchPopularShows() {
      try {
        const response = await axios.get("https://api.tvmaze.com/shows");
        this.groupShowsByGenre(response.data);
        const firstGenre = Object.keys(this.popularShowsByGenre).sort()[0];
        this.currentGenre = firstGenre;
        this.currentPopularShows = this.popularShowsByGenre[firstGenre] || [];
      } catch (error) {
        console.error('API çağrısı başarısız:', error);
      }
    },
    groupShowsByGenre(shows) {
      this.popularShowsByGenre = {};
      shows.forEach(show => {
        show.genres.forEach(genre => {
          if (!this.popularShowsByGenre[genre]) {
            this.popularShowsByGenre[genre] = [];
          }
          this.popularShowsByGenre[genre].push(show);
        });
      });
      this.popularShowsByGenre = Object.fromEntries(
        Object.entries(this.popularShowsByGenre).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      );
      Object.keys(this.popularShowsByGenre).forEach(genre => {
        this.popularShowsByGenre[genre] = this.popularShowsByGenre[genre].slice(0, 5);
      });
    },
    selectGenre(genre) {
      this.currentGenre = genre;
      this.currentPopularShows = this.popularShowsByGenre[genre] || [];
      this.selectedShow = null;
    },
    updatePopularShows(genre) {
      this.currentPopularShows = this.popularShowsByGenre[genre] || [];
    },
    async selectShow(show) {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${show.id}?embed=cast`);
        this.selectedShow = response.data;
      } catch (error) {
        console.error('API çağrısı başarısız:', error);
      }
    },
    closeModal() {
      this.selectedShow = null;
    },
  },
  computed: {
    sortedGenres() {
      return Object.keys(this.popularShowsByGenre).sort();
    },
  },
};
</script>

<style scoped>
  .clickable-item {
    cursor: pointer; 
  }
</style>