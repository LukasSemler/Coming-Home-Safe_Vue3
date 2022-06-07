<template>
  <div class="flex flex-row justify-center m-3 align-middle">
    <h1 class="text-center text-4xl mt-3 mb-5 mx-4">Tracking</h1>
    <div class="justify-self-end self-center ml-3 mb-1">
      <button
        @click="abmelden"
        type="button"
        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
      >
        Abmelden
      </button>
    </div>
  </div>
  <!-- Karte -->
  <div id="map" style="height: 600px"></div>
</template>

<script setup>
import mapbox from 'mapbox-gl';
import { ref, onMounted } from 'vue';
import { PiniaStore } from '../Store/Store.js';
import { useRouter } from 'vue-router';

const store = PiniaStore();
const router = useRouter();

let map = ref(null);
let mapAccessToken =
  'pk.eyJ1IjoiY29taW5naG9tZXNhZmUiLCJhIjoiY2wwN3RzZThnMDF3czNjbzFndnNrZ3h4OCJ9.xuaKaO_7XzSqiIBCAvcT7w';
let mapStyle = 'mapbox://styles/mapbox/streets-v11';

onMounted(() => {
  mapbox.accessToken = mapAccessToken;
  map.value = new mapbox.Map({
    container: 'map', // container ID
    style: mapStyle, // style URL
    center: [16.0, 48.0],
    zoom: 13, // starting zoom
  });
});

function abmelden() {
  store.deleteAktivenUser();
  router.push('/');
}
</script>
