<template>
  <!-- Show Success -->
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="z-40 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showSuccess"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">Erfolgreich geändert!</p>
                <p class="mt-1 text-sm text-gray-500">Die Daten wurden erfolgreich geändert</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  type="button"
                  @click="showSuccess = false"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <!-- ____________________________________________ -->

  <div
    aria-live="assertive"
    class="z-40 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showError"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <EmojiSadIcon class="h-6 w-6 text-red-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">Error</p>
                <p class="mt-1 text-sm text-gray-500">Es ist ein Fehler aufgetreten</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  type="button"
                  @click="showError = false"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <main class="relative -mt-32">
    <div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
          <aside class="py-6 lg:col-span-3">
            <nav class="space-y-1">
              <a
                @click="router.push(item.href)"
                v-for="item in subNavigation"
                :key="item.name"
                :class="[
                  item.current
                    ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                    : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                  'group border-l-4 px-3 py-2 flex items-center text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current
                      ? 'text-teal-500 group-hover:text-teal-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />
                <span class="truncate">
                  {{ item.name }}
                </span>
              </a>
            </nav>
          </aside>
          <hr />
          <div class="lg:col-span-9 mt-12">
            <h1 class="text-center text-3xl mt-3">Ihr Account</h1>
            <p class="my-3 mb-4 mx-2">
              Hier können Sie die persönlichen Daten von Ihrem Account ändern bzw. aktualisieren
            </p>
            <hr />
            <form class="space-y-6 mt-4 mx-2">
              <div>
                <div>
                  <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label for="first-name" class="block text-sm font-medium text-gray-700"
                        >Vorname</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="state.vorname"
                          type="text"
                          id="first-name"
                          name="first-name"
                          autocomplete="given-name"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />

                        <p
                          v-if="v$.vorname.$invalid"
                          class="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {{ v$.vorname.$silentErrors[0].$message }}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label for="last-name" class="block text-sm font-medium text-gray-700"
                        >Nachname</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="state.nachname"
                          type="text"
                          id="last-name"
                          name="last-name"
                          autocomplete="family-name"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />

                        <p
                          v-if="v$.nachname.$invalid"
                          class="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {{ v$.nachname.$silentErrors[0].$message }}
                        </p>
                      </div>
                    </div>

                    <div class="sm:col-span-2">
                      <label for="cover-photo" class="block text-sm font-medium text-gray-700">
                        Profilbild
                      </label>
                      <div
                        class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      >
                        <div v-if="!image" class="space-y-1 text-center">
                          <svg
                            class="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <div class="flex text-sm text-gray-600">
                            <label
                              for="file-upload"
                              class="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                class="sr-only"
                                @change="onFileChanged"
                              />
                            </label>
                          </div>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>

                        <div v-else>
                          <div class="flex justify-center">
                            <img
                              crossorigin="anonymous"
                              class="object-scale-down h-48 w-96 mt-3"
                              :src="image"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div v-if="image" class="flex justify-center">
                        <button
                          @click="image = null"
                          type="button"
                          class="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                        >
                          Bild entfernen
                        </button>
                      </div>
                      <h2 class="mt-4 font-normal">Warum sollten Sie ein Profilbild verwenden?</h2>
                      <p class="text-gray-500 font-light text-sm">
                        Wenn Sie ein Profilbild verwenden und es stößt Ihnen etwas zu können wir
                        dieses Bilder der Polizei zeigen und dadurch wird die Suche nach Ihnen
                        erleichtert
                      </p>
                    </div>

                    <div class="sm:col-span-2">
                      <label for="company" class="block text-sm font-medium text-gray-700"
                        >Email</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="state.email"
                          type="email"
                          name="email"
                          id="email"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />

                        <p
                          v-if="v$.email.$invalid"
                          class="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {{ v$.email.$silentErrors[0].$message }}
                        </p>
                      </div>
                    </div>

                    <div class="sm:col-span-2">
                      <label for="address" class="block text-sm font-medium text-gray-700"
                        >Strasse + Hausnummer</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="state.strasse_hnr"
                          type="text"
                          name="address"
                          id="address"
                          autocomplete="street-address"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />

                        <p
                          v-if="v$.strasse_hnr.$invalid"
                          class="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {{ v$.strasse_hnr.$silentErrors[0].$message }}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label for="postal-code" class="block text-sm font-medium text-gray-700"
                        >Postleitzahl</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="state.plz"
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autocomplete="postal-code"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />

                        <p
                          v-if="v$.plz.$invalid"
                          class="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {{ v$.plz.$silentErrors[0].$message }}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label for="city" class="block text-sm font-medium text-gray-700"
                        >Stadt</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="state.stadt"
                          type="text"
                          name="city"
                          id="city"
                          autocomplete="address-level2"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />

                        <p
                          v-if="v$.stadt.$invalid"
                          class="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {{ v$.stadt.$silentErrors[0].$message }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  @click="changeData"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Daten aktualisieren
                </button>

                <!-- <button
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Registrieren
                </button> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { CheckCircleIcon } from '@heroicons/vue/outline';
import { EmojiSadIcon } from '@heroicons/vue/outline';
import { XIcon } from '@heroicons/vue/solid';
import { KeyIcon, UserCircleIcon, TrashIcon } from '@heroicons/vue/outline';
import { useRouter } from 'vue-router';
import { PiniaStore } from '../../Store/Store';
import { ref, onMounted, reactive, computed } from 'vue';
import useValidate from '@vuelidate/core';
import { required, email, numeric } from '@vuelidate/validators';
import axios from 'axios';

const router = useRouter();
const store = PiniaStore();

const subNavigation = [
  { name: 'Account', href: '/account', icon: UserCircleIcon, current: true },
  { name: 'Password', href: '/account/password', icon: KeyIcon, current: false },
  { name: 'Delete Account', href: '/account/deleteAccount', icon: TrashIcon, current: false },
];

// Variablen for input erstellen
const state = reactive({
  vorname: '',
  nachname: '',
  email: '',
  strasse_hnr: '',
  stadt: '',
  plz: '',
});
let image = ref(null);
let imageSchicken = ref(null);
let datentyp = ref(null);
let showSuccess = ref(false);
let showError = ref(false);

// Rules for vuelidate
const rules = computed(() => {
  return {
    vorname: {
      required,
    },
    nachname: {
      required,
    },
    email: {
      required,
      email,
    },
    strasse_hnr: {
      required,
    },
    stadt: {
      required,
    },
    plz: {
      required,
      numeric,
    },
  };
});

// Object for validation
const v$ = useValidate(rules, state);

// Daten Befüllen
onMounted(() => {
  let userFromStore = store.getAktivenUser;

  // Felder mit Daten aus dem Store befüllen
  state.vorname = userFromStore.vorname;
  state.nachname = userFromStore.nachname;
  state.email = userFromStore.email;
  state.strasse_hnr = userFromStore.strasse;
  state.plz = userFromStore.plz;
  state.stadt = userFromStore.ort;

  image.value = userFromStore.link_thumbnail;
});

async function changeData(e) {
  e.preventDefault();

  try {
    if (!imageSchicken.value) {
      console.log('Nur Daten schicken');

      sendData();
    } else {
      console.log('Daten und Bild ändern');
      await sendImage();
      await sendData();
    }
  } catch (error) {
    console.log('error', error);
  }
}

//Bild hochladen
function onFileChanged(event) {
  {
    // Reference to the DOM input element
    let input = event.target;
    imageSchicken.value = event.target.files[0];
    const name = imageSchicken.value.name;
    if (name.includes('.jpg')) {
      datentyp.value = 'jpg';
    } else if (name.includes('.png')) {
      datentyp.value = 'png';
    } else if (name.includes('.jpeg')) {
      datentyp.value = 'jpeg';
    }
    // Ensure that you have a file before attempting to read it
    if (input.files && input.files[0]) {
      // create a new FileReader to read this image and convert to base64 format
      let reader = new FileReader();
      // Define a callback function to run, when FileReader finishes its job
      reader.onload = (e) => {
        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
        // Read image as base64 and set to imageData
        image.value = e.target.result;
      };
      // Start the reader job - read file as a data url (base64 format)
      reader.readAsDataURL(input.files[0]);
    }
  }
}

async function sendImage() {
  let formData = new FormData();
  formData.append('image', imageSchicken.value);
  formData.append('titel', state.email);
  formData.append('datentyp', datentyp.value);
  const res = await axios.post(`/sendThumbnail`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
}

async function sendData() {
  try {
    // Register erledigen
    const { data } = await axios.patch(`/patchUser/${store.getAktivenUser.k_id}`, {
      vorname: state.vorname,
      nachname: state.nachname,
      email: state.email,
      strasse_hnr: state.strasse_hnr,
      stadt: state.stadt,
      plz: state.plz,
      // link_thumbnail: `http://localhost:2410/images/${state.email}.${datentyp.value}`,
    });

    store.changeAktivenUser(data);
    showSuccess.value = true;

    setTimeout(() => {
      showSuccess.value = false;
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.log('Error beim Daten schicken', error);
    showError.value = true;

    setTimeout(() => {
      showError.value = false;
    }, 3000);
  }
}

// function felderClearen() {
//   state.vorname = '';
//   state.nachname = '';
//   state.email = '';
//   state.strasse_hnr = '';
//   state.stadt = '';
//   state.plz = '';
//   state.telefon = '';
// }
</script>
