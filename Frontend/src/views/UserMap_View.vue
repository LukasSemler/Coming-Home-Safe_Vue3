<template>
  <div>
    <h1 class="text-center text-4xl mt-3 mb-5">User Map</h1>
    <div id="map" style="height: 600px"></div>
    <button @click="abmelden">Log Out</button>
  </div>
</template>

<script setup>
import mapbox from 'mapbox-gl';
import { PiniaStore } from '../Store/Store';
import { ref, onMounted } from 'vue';
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
