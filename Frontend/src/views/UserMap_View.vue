<template>
  <div>
    <div class="flex flex-row justify-end m-3 align-middle">
      <h1 class="text-center text-4xl mt-3 mb-5 mx-4">Tracking</h1>
      <div class="items-center self-center ml-3 mb-1">
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

    <div class="flex flex-row justify-center m-3">
      <button
        @click="startStopTracker"
        type="button"
        :class="`inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${color} ${colorHover} `"
      >
        {{ statusTrackingButton }}
      </button>
      <button
        v-if="statusTracking"
        @click="startStopTracker"
        type="button"
        :class="`inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${color} ${colorHover} `"
      >
        Alarm
      </button>
    </div>
  </div>
</template>

<script setup>
import mapbox from 'mapbox-gl';
import { PiniaStore } from '../Store/Store';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const store = PiniaStore();
const router = useRouter();

let map = ref(null);
let mapAccessToken = ref(
  'pk.eyJ1IjoiY29taW5naG9tZXNhZmUiLCJhIjoiY2wwN3RzZThnMDF3czNjbzFndnNrZ3h4OCJ9.xuaKaO_7XzSqiIBCAvcT7w',
);
let mapStyle = 'mapbox://styles/mapbox/streets-v11';

let centerPosition = ref(null);

let statusTracking = ref(false);
let statusTrackingButton = ref('Start');
let color = ref('bg-green-500');
let colorHover = ref('hover:bg-green-500');

let interval = ref(null);
let mapMarkerListe = ref([]);

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
  mapbox.accessToken = mapAccessToken.value;
  map.value = new mapbox.Map({
    container: 'map', // container ID
    style: mapStyle, // style URL
    center: [centerPosition.value.lng, centerPosition.value.lat],
    zoom: 13, // starting zoom
  });
}

async function startStopTracker() {
  if (!statusTracking.value) {
    // Allgemeine Sachen
    statusTracking.value = true;
    color.value = 'bg-red-500';
    colorHover.value = 'hover:bg-red-600';
    statusTrackingButton.value = 'Stop';

    interval.value = setInterval(track, 5000);
  } else {
    statusTracking.value = false;
    statusTrackingButton.value = 'Start';
    color.value = 'bg-green-500';
    colorHover.value = 'hover:bg-green-500';
  }
}

async function track() {
  if (navigator.geolocation) {
    //Function gibt aktuelle Coordinaten zurück
    let getCoordinates = () =>
      new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

    //Aktuelle Standortkoordinaten abfragen
    let {
      coords: { latitude: lat, longitude: lng },
    } = await getCoordinates();

    //Map auf Marker Zentrieren
    map.value.flyTo({ center: [lng, lat], zoom: 15 });

    //Coordinaten werden eingesetzt!
    let standortDaten = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapAccessToken.value}`,
    );
    const standort = standortDaten.data.features[0].place_name;
    console.log(standort);

    //Marker auf sich selbst setzen und alten davor löschen
    deleteAllMarkers();

    //Neuen (einzigen) Marker generieren
    const marker1 = new mapbox.Marker({
      anchor: 'center',
      color: '#03C04A',
    })
      .setLngLat([lng, lat])
      .addTo(map.value)
      .setPopup(new mapbox.Popup().setHTML(`<p>Deine Position: ${standort} </p>`)); // add popup
    mapMarkerListe.value.push(marker1);

    //Center-Position neu setzen und Map zentrieren
    centerPosition.value = {
      lat,
      lng,
    };
    map.value.center = [centerPosition.value.lng, centerPosition.value.lat];

    //Datum
    const date = new Date();

    //Object für WS bauen
    let position = {
      lat,
      lng,
      dateTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      id: 1,
      user: store.getAktivenUser,
      adresse: standort,
    };

    //! Standortpaket ServiceWorker schicken, der kümmert sich darum
    // navigator.serviceWorker.ready.then((registration) => {
    //   registration.active.postMessage(
    //     JSON.stringify({
    //       type: 'position',
    //       payload: position,
    //     }),
    //   );
    // });

    //Standort zu der Datenbank senden
    await axios.post('/sendPosition', position);
  } else {
    alert('Dieser Browser unterstützt die Abfrage der Geolocation nicht.');
  }
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

function deleteAllMarkers() {
  mapMarkerListe.value.forEach((element) => {
    element.remove();
  });
}

function abmelden() {
  store.deleteAktivenUser();
  router.push('/');
}
</script>
