<template>
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
                        Schreibe mit einem User
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
                      v-if="nachrichten.length > 0"
                      class="w-full max-h-96 border-2 border-gray-300 mb-6 overflow-scroll"
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

  <!-- User anzeigen -->
  <h1 class="text-center text-3xl font-bold my-4" v-if="people.length > 0">Aktive User</h1>
  <h1 class="text-center text-3xl font-bold my-4" v-else>Momentan ist kein User aktiv</h1>

  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-3">
    <li
      v-for="person in people"
      :key="person.email"
      class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div class="flex-1 flex flex-col p-8">
        <img class="w-32 h-32 flex-shrink-0 mx-auto rounded-full" :src="person.imageUrl" alt="" />
        <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ person.name }}</h3>
        <dl class="mt-1 flex-grow flex flex-col justify-between">
          <dt class="sr-only">Title</dt>
          <dd class="text-gray-500 text-sm">{{ person.title }}</dd>
          <dt class="sr-only">Role</dt>
          <dd class="mt-3">
            <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{
              person.role
            }}</span>
          </dd>
        </dl>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="w-0 flex-1 flex">
            <p
              class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              <MapIcon class="w-5 h-5 text-gray-400" aria-hidden="true"></MapIcon>
              <span class="ml-3">Show on Map</span>
            </p>
          </div>
          <div class="-ml-px w-0 flex-1 flex">
            <p
              @click="openChat = true"
              class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
            >
              <ChatIcon class="h-6 w-6" aria-hidden="true" />
              <span class="ml-3">Chat</span>
            </p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ChatIcon, XIcon, MapIcon } from '@heroicons/vue/outline';

import mapbox from 'mapbox-gl';
import { ref, onMounted } from 'vue';
import { PiniaStore } from '../Store/Store.js';
import { useRouter } from 'vue-router';

const store = PiniaStore();
const router = useRouter();

let openChat = ref(false);

let aktiveUser = ref([]);

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
];

let map = ref(null);
let mapAccessToken =
  'pk.eyJ1IjoiY29taW5naG9tZXNhZmUiLCJhIjoiY2wwN3RzZThnMDF3czNjbzFndnNrZ3h4OCJ9.xuaKaO_7XzSqiIBCAvcT7w';
let mapStyle = 'mapbox://styles/mapbox/streets-v11';

let ws = ref(null);
let wsServerAdress = ref('ws://localhost:2410');

let nachricht = ref('');
let nachrichten = ref([]);

onMounted(() => {
  mapbox.accessToken = mapAccessToken;
  map.value = new mapbox.Map({
    container: 'map', // container ID
    style: mapStyle, // style URL
    center: [16.0, 48.0],
    zoom: 13, // starting zoom
  });

  //! Websocket Verbindung Überwachens
  let email = store.getAktivenUser.email;
  email = email.replace('@', '|');

  ws.value = new WebSocket(wsServerAdress.value, email);
  ws.value.onmessage = (data) => {
    let message = JSON.parse(data.data);

    console.log(message);

    const from = message.from;
    if (message.type == 'MessageUser') {
      nachrichten.value.push({ message: message.data, from });
    }
  };
});

async function sendMessage(e) {
  e.preventDefault();
  console.log(nachrichten.value[0].from);

  ws.value.send(
    JSON.stringify({
      type: 'MessageMitarbeiter',
      daten: nachricht.value,
      to: nachrichten.value[0].from,
    }),
  );

  nachrichten.value.push({ from: 'Ich', message: nachricht.value });

  nachricht.value = '';
}

function abmelden() {
  store.deleteAktivenUser();
  router.push('/');
}
</script>
