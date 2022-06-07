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
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const store = PiniaStore();
const router = useRouter();

let map = ref(null);
let mapAccessToken =
  'pk.eyJ1IjoiY29taW5naG9tZXNhZmUiLCJhIjoiY2wwN3RzZThnMDF3czNjbzFndnNrZ3h4OCJ9.xuaKaO_7XzSqiIBCAvcT7w';
let mapStyle = 'mapbox://styles/mapbox/streets-v11';

let centerPosition = ref(null);

onMounted(() => {
  // Karte laden und zentrieren
  centerMap();
  try {
    if (!map.value.loaded()) console.log('nicht loaded map');
  } catch (e) {
    console.log('nicht geladen');
  }

  //! Verbindung zum WS aufbauen, nicht sicher ob das geht
  // connectToWs();

  // window.addEventListener('onbeforeunload', (event) => {
  //   //Von Websocket Verbindung trennen
  //   disconnectFromWs();
  // });
});

// Funktion um die Karte zu zentrieren
async function centerMap() {
  //Aktuellen Standort bekommen
  let getCoordinates = () =>
    new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  let {
    coords: { latitude: lat, longitude: lng },
  } = await getCoordinates();

  //Sich selber auf die centerposition setzen
  centerPosition.value = { lat, lng };

  //Map-Initialisieren
  mapbox.accessToken = mapAccessToken;
  map.value = new mapbox.Map({
    container: 'map', // container ID
    style: mapStyle, // style URL
    center: [centerPosition.value.lng, centerPosition.value.lat],
    zoom: 13, // starting zoom
  });
}

function connectToWs() {
  //ServiceWorker sagen, dass er sich verbinden soll
  navigator.serviceWorker.ready.then((registration) => {
    registration.active.postMessage(
      JSON.stringify({
        type: 'connect',
        payload: { wsAdresse: this.ws_serverAdress, email: this.aktiverUser.email },
      }),
    );
  });

  navigator.serviceWorker.addEventListener('message', (event) => {
    const { type, payload } = JSON.parse(event.data);

    console.log(`Type: ${type} Payload: ${payload}`);
  });
}

function disconnectFromWs() {
  navigator.serviceWorker.ready.then((registration) => {
    registration.active.postMessage(
      JSON.stringify({
        type: 'disconnect',
        payload: 'disconnectPayload',
      }),
    );
  });
}

function abmelden() {
  store.deleteAktivenUser();
  router.push('/');
}
</script>
