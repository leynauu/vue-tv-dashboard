<template>
  <div class="modal fade show" tabindex="-1" role="dialog" style="display: block;" @click.self="onClose">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content bg-dark">
        <div class="modal-header text-light">
          <h4 class="modal-title">{{ show.name }}</h4>
          <button type="button" class="close" @click="onClose">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body text-light">
          <p><strong>Özet:</strong> <span v-html="show.summary"></span></p>
          <p><strong>Oyuncular:</strong> {{ cast }}</p>
          <p><strong>Tür:</strong> {{ show.genres.join(', ') }}</p>
          <p><strong>Yayın Tarihi:</strong> {{ show.premiered ? new Date(show.premiered).toLocaleDateString('tr-TR',
              { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'Bilinmiyor' }}</p>
          <p><strong>Puan:</strong> {{ show.rating.average }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="onClose">Kapat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowDetails',
  props: {
    show: {
      type: Object,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    }
  },
  computed: {
    cast() {
      if (this.show._embedded && this.show._embedded.cast) {
        return this.show._embedded.cast.map(member => member.person.name).join(', ');
      }
      return '';
    }
  }
};
</script>

<style scoped>
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
</style>
