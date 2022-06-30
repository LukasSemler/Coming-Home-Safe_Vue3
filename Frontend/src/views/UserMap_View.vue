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

  <TransitionRoot as="template" :show="openChat">
    <Dialog as="div" class="relative z-10" @close="openChat = true">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">
                        Chat mit einem Mitarbeiter
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                          @click="openChat = false"
                        >
                          <span class="sr-only">Close panel</span>
                          <XIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <div
                      class="w-full max-h-96 border-2 border-gray-300 mb-6 overflow-scroll"
                      v-if="nachrichten.length > 0"
                    >
                      <p v-for="(elem, i) of nachrichten" :key="i">
                        <span class="ml-1 italic font-thin">{{ elem.from }}:</span>
                        {{ elem.message }}
                      </p>
                    </div>
                    <!-- INPUT -->
                    <form class="relative">
                      <div
                        class="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500"
                      >
                        <label for="description" class="sr-only">Description</label>
                        <textarea
                          v-model="nachricht"
                          rows="2"
                          name="description"
                          id="description"
                          class="block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
                          placeholder="Schreiben Sie eine Nachticht"
                        />

                        <!-- Spacer element to match the height of the toolbar -->
                        <div aria-hidden="true">
                          <div class="py-2">
                            <div class="h-9" />
                          </div>
                          <div class="h-px" />
                          <div class="py-2">
                            <div class="py-px">
                              <div class="h-9" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="absolute bottom-0 inset-x-px">
                        <!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
                        <div class="flex flex-wrap justify-end py-2 px-2 space-x-2 sm:px-3">
                          <span
                            @click="sendPreset('Ich brauche hilfe')"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800"
                          >
                            Ich brauche hilfe
                          </span>
                          <span
                            @click="sendPreset('Alles OK')"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800"
                          >
                            Alles in Ordnung
                          </span>
                          <!-- <span
                            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-pink-100 text-pink-800"
                          >
                            Badge
                          </span> -->
                        </div>
                        <div
                          class="border-t border-gray-200 px-2 py-2 flex items-center space-x-3 sm:px-3 justify-end mr-3"
                        >
                          <button
                            @click="sendMessage"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          >
                            Senden
                          </button>
                        </div>
                      </div>
                    </form>
                    <!-- /End replace -->
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <div>
    <div class="flex justify-center my-2">
      <h1 class="text-center text-3xl sm:text-4xl">Tracking</h1>
    </div>

    <!-- Karte -->
    <div id="map" style="height: 500px"></div>

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
        @click="alarmClicked"
        type="button"
        :class="
          !alarmButtonBlinken
            ? `mx-3 inline-flex items-center px-6 py-2 border-2 border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700`
            : `mx-3 inline-flex items-center px-6 py-2 border-2 border-red-600 text-base font-medium rounded-md shadow-sm text-red bg-white hover:bg-red-100`
        "
      >
        Alarm
      </button>
      <button
        v-if="statusTracking"
        @click="openChat = true"
        type="button"
        class="mx-2 inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-chsBlue hover:bg-chsDarkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        <ChatIcon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup>
//IMPORTS
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ExclamationIcon, ChatIcon, XIcon } from '@heroicons/vue/outline';
import mapbox from 'mapbox-gl';
import { PiniaStore } from '../Store/Store';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import polizeistationFindenScript from '../ZusätzlicheScripts/polizeiFinden.js';

//VUE
const store = PiniaStore();
const router = useRouter();

//MAP
let map = ref(null);
let mapAccessToken = ref(
  'pk.eyJ1IjoiY29taW5naG9tZXNhZmUiLCJhIjoiY2wwN3RzZThnMDF3czNjbzFndnNrZ3h4OCJ9.xuaKaO_7XzSqiIBCAvcT7w',
);
let mapStyle = 'mapbox://styles/mapbox/streets-v11';
let centerPosition = ref(null);
let mapMarkerListe = ref([]);
let routenAnweisungen = ref([]);
let dauerRoute = ref(null);

//TRACKING
let statusTracking = ref(false);
let statusTrackingButton = ref('Start');
let trackInterval = ref(null);
let color = ref('bg-green-500');
let colorHover = ref('hover:bg-green-500');

//ALARM
let alarmStarted = ref(false);
let alarmButtonBlinken = ref(false);
let alarmBlinkenIntervall = reactive({});

//WEBSOCKET
// let wsServerAdress = ref('ws://localhost:2410');
let wsServerAdress = ref('wss://testactionhosting.herokuapp.com/');
let ws = ref(null);
let serviceWorkerRegistration = reactive({});

//NACHRICHTEN-CHAT
let close = ref(false);
let openChat = ref(false);
let nachricht = ref('');
let nachrichten = ref([]);

//Beim Usermap-Aufruf
onMounted(async () => {
  // Karte laden und zentrieren
  centerMap();
  try {
    if (!map.value.loaded()) console.log('nicht loaded map');
  } catch (e) {
    console.log('nicht geladen');
  }

  //ServiceWorker events abfangen
  navigator.serviceWorker.addEventListener('message', async (event) => {
    const { type, data } = JSON.parse(event.data);
    console.log('Type: ' + type + '| Data: ' + data);

    //Alarm abschalten
    if (type == 'alarmStopped') {
      //Alarm clearen
      clearInterval(alarmBlinkenIntervall);
      alarmButtonBlinken.value = false;
      alarmStarted.value = false;
    }
  });

  //ServiceWorker Variable vom Store runterladen
  setTimeout(() => ((serviceWorkerRegistration = store.getServiceWorker), 1500));

  //! Websocket Verbindung Überwachens --> USER-Chat
  let email = store.getAktivenUser.email;
  email = email.replace('@', '|');

  ws.value = new WebSocket(wsServerAdress.value, email);
  ws.value.onmessage = (data) => {
    const nachricht = JSON.parse(data.data);
    console.log(nachricht);
    if (nachricht.type == 'MessageMitarbeiter') {
      nachrichten.value.push({ from: 'Mitarbeiter', message: nachricht.data });
    }
  };
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

//Wenn man das Tracking starten/stoppen will
async function startStopTracker() {
  serviceWorkerRegistration = store.getServiceWorker;

  if (!statusTracking.value) {
    // Allgemeine Sachen
    statusTracking.value = true;
    color.value = 'bg-fuchsia-600';
    colorHover.value = 'hover:bg-fuchsia-600';
    statusTrackingButton.value = 'Stop';

    //Tracking auf SW-Seite starten
    serviceWorkerRegistration.active.postMessage(
      JSON.stringify({
        type: 'startTracking',
        userId: store.getAktivenUser.k_id,
        payload: 'Kein Payload',
      }),
    );

    trackInterval.value = setInterval(track, 5000);
  } else {
    //Tracking auf SW-Seite beenden
    serviceWorkerRegistration.active.postMessage(
      JSON.stringify({
        type: 'endTracking',
        userId: store.getAktivenUser.k_id,
        payload: 'Kein Payload',
      }),
    );

    // Buttons und so anpassen wenn das Tracking beendet wird
    statusTracking.value = false;
    statusTrackingButton.value = 'Start';
    color.value = 'bg-green-500';
    colorHover.value = 'hover:bg-green-500';

    // trackInterval stoppen
    clearInterval(trackInterval.value);
    trackInterval.value = null;

    // Alle Marker von der Karte entfernen
    deleteAllMarkers();

    // Route von der Karte entfernen
    map.value.removeLayer('route');
    map.value.removeSource('route');
    map.value.removeLayer('point');
    map.value.removeSource('point');
    map.value.removeLayer('end');
    map.value.removeSource('end');
  }
}

//Wenn das Tracking an ist
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

    // Standortpaket ServiceWorker schicken, der kümmert sich darum
    serviceWorkerRegistration.active.postMessage(
      JSON.stringify({
        type: 'tracking',
        userId: store.getAktivenUser.k_id,
        payload: position,
      }),
    );

    //Standort zu der Datenbank senden
    await axios.post('/sendPosition', position);
  } else {
    alert('Dieser Browser unterstützt die Abfrage der Geolocation nicht.');
  }
}

//Wenn man auf den Alarm-Button clickt
function alarmClicked() {
  //Alarm-Variable auf true setzen
  alarmStarted.value = true;

  //Button zum Blinken bringen
  alarmBlinkenIntervall = setInterval(() => {
    alarmButtonBlinken.value
      ? (alarmButtonBlinken.value = false)
      : (alarmButtonBlinken.value = true);
  }, 500);

  //Befehl an ServiceWorker senden, um Alarm zu setzen
  serviceWorkerRegistration.active.postMessage(
    JSON.stringify({
      type: 'setAlarm',
      userId: store.getAktivenUser.k_id,
      payload: store.getAktivenUser,
    }),
  );

  //Route zur nächsten Polizei-Station erstellen
  let closestPol = polizeistationFindenScript(centerPosition.value.lat, centerPosition.value.lng);
  let cx = closestPol.station.X;
  let cy = closestPol.station.Y;

  cx = cx.replace(',', '.');
  cy = cy.replace(',', '.');
  cx = Number(cx);
  cy = Number(cy);
  console.log(cx, cy);
  // make an initial directions request that
  // starts and ends at the same location
  getRoute([centerPosition.value.lat, centerPosition.value.lng]);

  // Add starting point to the map
  map.value.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [centerPosition.value.lng, centerPosition.value.lat],
            },
          },
        ],
      },
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#3887be',
    },
  });
  const coords = [cx, cy];
  const end = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: coords,
        },
      },
    ],
  };
  if (map.value.getLayer('end')) {
    map.value.getSource('end').setData(end);
  } else {
    map.value.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: coords,
              },
            },
          ],
        },
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#f30',
      },
    });
  }
  getRoute(coords);
}

//Alle Marker von der Map zu entfernen
function deleteAllMarkers() {
  mapMarkerListe.value.forEach((element) => {
    element.remove();
  });
}

//Abmelden-Button clicked
function abmelden() {
  // Buttons und so anpassen wenn das Tracking beendet wird
  statusTracking.value = false;
  statusTrackingButton.value = 'Start';
  color.value = 'bg-green-500';
  colorHover.value = 'hover:bg-green-500';

  // trackInterval stoppen
  clearInterval(trackInterval.value);
  trackInterval.value = null;

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

  //SW-Verbindung trennen
  store.disconnectFromServiceWorker();

  //Zum LoginView verbinden
  close.value = false;
  router.push('/');
}

function sendMessage(e) {
  e.preventDefault();

  ws.value.send(
    JSON.stringify({
      type: 'MessageUser',
      daten: nachricht.value,
      from: store.getAktivenUser.email,
    }),
  );

  nachrichten.value.push({ from: 'Ich', message: nachricht.value });

  nachricht.value = '';
}

async function sendPreset(message) {
  ws.value.send(
    JSON.stringify({
      type: 'MessageUser',
      daten: message,
      from: store.getAktivenUser.email,
    }),
  );

  nachrichten.value.push({ from: 'Ich', message: message });

  nachricht.value = '';
}

//Route berechnen
async function getRoute(end) {
  const start = [centerPosition.value.lng, centerPosition.value.lat];
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  const query = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapAccessToken.value}`,
  );

  console.log(query.data);

  const data = query.data.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route,
    },
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map.value.getSource('route')) {
    map.value.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    map.value.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson,
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75,
      },
    });
  }
  // Routenanweisung
  const steps = data.legs[0].steps;
  for (const step of steps) {
    routenAnweisungen.value.push(step.maneuver.instruction);
  }
  dauerRoute.value = Math.floor(data.duration / 60);

  console.log('GEHZEIT: ' + dauerRoute.value + 'min');
}
</script>
