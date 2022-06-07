<template>
  <TransitionRoot as="template" :show="close">
    <Dialog as="div" class="relative z-10" @close="close = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6"
            >
              <div>
                <div
                  class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
                >
                  <ExclamationIcon class="h-6 w-6 text-orange-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    Warning
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Der Tracker ist noch läuft noch. Wenn Sie sich trotzdem abmelden, wird das
                      Tracking gestoppt.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:col-start-2 sm:text-sm"
                  @click="abmelden"
                >
                  Akzeptieren
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-sm"
                  @click="close = false"
                  ref="cancelButtonRef"
                >
                  Cancle
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <div>
    <div class="flex flex-row justify-end m-3 align-middle">
      <h1 class="text-center text-4xl mt-3 mb-5 mx-4">Tracking</h1>
      <div class="items-center self-center ml-3 mb-1">
        <button
          @click="checkIfTrackerIsStarted"
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
        :class="`mx-3 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700`"
      >
        Alarm
      </button>
    </div>
  </div>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ExclamationIcon } from '@heroicons/vue/outline';

import mapbox from 'mapbox-gl';
import { PiniaStore } from '../Store/Store';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

let close = ref(false);

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
let alarmStarted = ref(false);

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
    color.value = 'bg-fuchsia-600';
    colorHover.value = 'hover:bg-fuchsia-600';
    statusTrackingButton.value = 'Stop';

    interval.value = setInterval(track, 5000);
  } else {
    // Buttons und so anpassen wenn das Tracking beendet wird
    statusTracking.value = false;
    statusTrackingButton.value = 'Start';
    color.value = 'bg-green-500';
    colorHover.value = 'hover:bg-green-500';

    // Interval stoppen
    clearInterval(interval.value);
    interval.value = null;

    // Alle Marker von der Karte entfernen
    deleteAllMarkers();

    // Route von der Karte entfernen
    if (alarmStarted.value) {
      map.value.removeLayer('route');
      map.value.removeSource('route');

      map.value.removeLayer('point');
      map.value.removeSource('point');

      map.value.removeLayer('end');
      map.value.removeSource('end');
    }
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

function checkIfTrackerIsStarted() {
  if (!statusTracking.value) {
    store.deleteAktivenUser();
    router.push('/');
  } else close.value = true;
}

function abmelden() {
  // Buttons und so anpassen wenn das Tracking beendet wird
  statusTracking.value = false;
  statusTrackingButton.value = 'Start';
  color.value = 'bg-green-500';
  colorHover.value = 'hover:bg-green-500';

  // Interval stoppen
  clearInterval(interval.value);
  interval.value = null;

  // Alle Marker von der Karte entfernen
  deleteAllMarkers();

  // Route von der Karte entfernen
  if (alarmStarted.value) {
    map.value.removeLayer('route');
    map.value.removeSource('route');

    map.value.removeLayer('point');
    map.value.removeSource('point');

    map.value.removeLayer('end');
    map.value.removeSource('end');
  }

  close.value = false;
  router.push('/');
}
</script>
