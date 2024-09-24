<template>
    <div>
      <h3 class="text-light">Popüler Şovlar</h3>
      <div class="row">
        <div class="col-md-4 col-6 p-3 h-100" v-for="show in popularShows" :key="show.id">
          <div class="card bg-dark border text-white">
            <img v-if="show.image" :src="show.image.medium" class="card-img-top" :alt="show.name" />
            <div class="card-body">
              <h5 class="card-title">{{ show.name }}</h5>
              <div class="border-bottom my-2"></div>
              <p class="card-text mb-1"><small>Puan: {{ show.rating.average || 'Bilinmiyor' }}</small></p>
              <p class="card-text"><small><strong>Tür:</strong> {{ show.genres.join(', ') }}</small></p>
              <button class="btn btn-secondary" @click="selectShow(show)">Detaylar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppPopularShows',
    props: {
      popularShows: {
        type: Array,
        required: true
      },
      selectShow: {
        type: Function,
        required: true
      }
    }
  };
  </script>
  
  