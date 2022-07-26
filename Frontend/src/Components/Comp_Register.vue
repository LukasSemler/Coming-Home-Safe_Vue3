<template>
  <!-- 2 Faktor Verifikation -->
  <TransitionRoot as="template" :show="showVerifikation">
    <Dialog as="div" class="relative z-10" @close="showVerifikation = false">
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
              class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6"
            >
              <div>
                <div
                  class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100"
                >
                  <MailIcon class="h-6 w-6" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    2 Faktoren Bestätigung
                  </DialogTitle>
                  <div class="mt-2">
                    <hr />

                    <div class="flex flex-col mt-6">
                      <span
                        >Geben Sie den Code ein, der an
                        <span class="font-bold">{{ state.email }}</span> gesendet wurde</span
                      >
                    </div>

                    <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
                      <input
                        v-model="state2.char1"
                        class="m-2 border h-10 w-10 text-center form-control rounded focus:border-teal-600 focus:ring-teal-600"
                        type="text"
                        id="first"
                        maxlength="1"
                      />
                      <input
                        v-model="state2.char2"
                        class="m-2 border h-10 w-10 text-center form-control rounded focus:border-teal-600 focus:ring-teal-600"
                        type="text"
                        id="second"
                        maxlength="1"
                      />
                      <input
                        v-model="state2.char3"
                        class="m-2 border h-10 w-10 text-center form-control rounded focus:border-teal-600 focus:ring-teal-600"
                        type="text"
                        id="third"
                        maxlength="1"
                      />
                      <input
                        v-model="state2.char4"
                        class="m-2 border h-10 w-10 text-center form-control rounded focus:border-teal-600 focus:ring-teal-600"
                        type="text"
                        id="fourth"
                        maxlength="1"
                      />
                      <input
                        v-model="state2.char5"
                        class="m-2 border h-10 w-10 text-center form-control rounded focus:border-teal-600 focus:ring-teal-600"
                        type="text"
                        id="fifth"
                        maxlength="1"
                      />
                      <input
                        v-model="state2.char6"
                        class="m-2 border h-10 w-10 text-center form-control rounded focus:border-teal-600 focus:ring-teal-600"
                        type="text"
                        id="sixth"
                        maxlength="1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:col-start-2 sm:text-sm"
                  @click="register"
                >
                  Verifizieren
                </button>
                <!-- <button
                  v-else
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 sm:col-start-2 sm:text-sm"
                  :disabled="checkErrorOTP"
                >
                  Verifizieren
                </button> -->
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  @click="showVerifikation = false"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- ____________________________________________ -->
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-40"
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
                <XCircleIcon class="h-6 w-6 text-red-500" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">Error</p>
                <p class="mt-1 text-sm text-gray-500">
                  Es gibt bereits einen User mit dieser Email-Adresse, bitte verwenden Sie eine
                  andere
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="showError = false"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
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

  <!-- ----------------------------------------------------------------------------------------------- -->

  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="/WebsiteIcons/Coming-Home-Safe-Icon.webp"
        alt="Electronic City"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6">
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
                  <h2 class="mt-3 font-normal">Warum sollten Sie ein Profilbild verwenden?</h2>
                  <p class="text-gray-500 font-light text-sm">
                    Wenn Sie ein Profilbild verwenden und es stößt Ihnen etwas zu können wir dieses
                    Bilder der Polizei zeigen und dadurch wird die Suche nach Ihnen erleichtert
                  </p>
                </div>

                <div class="sm:col-span-2">
                  <label for="company" class="block text-sm font-medium text-gray-700">Email</label>
                  <div class="mt-1">
                    <input
                      v-model="state.email"
                      type="email"
                      name="email"
                      id="email"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />

                    <p v-if="v$.email.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
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

                    <p v-if="v$.plz.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                      {{ v$.plz.$silentErrors[0].$message }}
                    </p>
                  </div>
                </div>

                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700">Stadt</label>
                  <div class="mt-1">
                    <input
                      v-model="state.stadt"
                      type="text"
                      name="city"
                      id="city"
                      autocomplete="address-level2"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />

                    <p v-if="v$.stadt.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                      {{ v$.stadt.$silentErrors[0].$message }}
                    </p>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="password" class="block text-sm font-medium text-gray-700"
                    >Passwort</label
                  >
                  <div class="mt-1">
                    <input
                      v-model="state.password"
                      type="password"
                      name="password"
                      id="password"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />

                    <p
                      v-if="v$.password.$invalid"
                      class="mt-2 text-sm text-red-600"
                      id="email-error"
                    >
                      {{ v$.password.$silentErrors[0].$message }}
                    </p>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="phone" class="block text-sm font-medium text-gray-700"
                    >Passwort bestätigen</label
                  >
                  <div class="mt-1">
                    <input
                      v-model="state.c_password"
                      type="password"
                      name="c_password"
                      id="c_password"
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />

                    <p
                      v-if="v$.c_password.$invalid"
                      class="mt-2 text-sm text-red-600"
                      id="email-error"
                    >
                      {{ v$.c_password.$silentErrors[0].$message }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a
                @click="router.push('/')"
                class="font-medium text-teal-600 hover:text-teal-500 underline"
              >
                Zum Login
              </a>
            </div>
          </div>

          <div>
            <button
              @click="getCode"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Registrieren
            </button>

            <!-- <button
              v-else
              :disabled="checkError"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Registrieren
            </button> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { MailIcon } from '@heroicons/vue/outline';
import { XCircleIcon } from '@heroicons/vue/outline';
import { XIcon } from '@heroicons/vue/solid';

import { useRouter } from 'vue-router';
import { reactive, computed, ref } from 'vue';

import useValidate from '@vuelidate/core';
import { required, email, numeric, minLength, sameAs } from '@vuelidate/validators';
import axios from 'axios';

const router = useRouter();
let showError = ref(false);
let showVerifikation = ref(false);

let image = ref(null);
let imageSchicken = ref(null);
let datentyp = ref(null);

let code = ref('');

// Variablen for input erstellen
const state = reactive({
  vorname: '',
  nachname: '',
  email: '',
  strasse_hnr: '',
  stadt: '',
  plz: '',
  password: '',
  c_password: '',
});

const state2 = reactive({
  char1: '',
  char2: '',
  char3: '',
  char4: '',
  char5: '',
  char6: '',
});

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
    password: {
      required,
      minLength: minLength(6),
    },
    c_password: {
      required,
      minLength: minLength(6),
      sameAs: sameAs(state.password),
    },
  };
});

const rules2 = computed(() => {
  return {
    char1: {
      required,
    },
    char2: {
      required,
    },
    char3: {
      required,
    },
    char4: {
      required,
    },
    char5: {
      required,
    },
    char6: {
      required,
    },
  };
});

const v$ = useValidate(rules, state);
// const vOTP = useValidate(rules2, state2);

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
  if (res.status != 200) showError.value = true;
  setTimeout(() => {
    showError.value = false;
  }, 5000);
}

async function sendData() {
  // Register erledigen
  const res = await axios.post('/sendDataRegister', {
    vorname: state.vorname,
    nachname: state.nachname,
    email: state.email,
    strasse_hnr: state.strasse_hnr,
    stadt: state.stadt,
    plz: state.plz,
    password: state.password,
    link_thumbnail: `http://localhost:2410/images/${state.email}.${datentyp.value}`,
  });
  if (res.status == 200) {
    felderClearen();
    router.push('/');
  }
}

async function register() {
  try {
    if (
      code.value ==
      `${state2.char1}${state2.char2}${state2.char3}${state2.char4}${state2.char5}${state2.char6}`
    ) {
      await sendImage();
      await sendData();
    } else alert('Code stimmt nicht überein');
  } catch (error) {
    console.log(error);
  }
}

async function getCode(e) {
  e.preventDefault();
  try {
    v$.value.$validate();

    if (!v$.value.$error) {
      console.log('sucess');
      // Register erledigen
      const { data } = await axios.post('/sendCodeRegister', {
        vorname: state.vorname,
        nachname: state.nachname,
        email: state.email,
      });

      code.value = data;
      console.log('Code: ', code.value);

      // OTP anzeigen
      showVerifikation.value = true;
    } else console.log('Nicht alle Felder ausgefüllt');

    e.preventDefault();
  } catch (error) {
    e.preventDefault();

    console.log(error.message);

    showError.value = true;

    setTimeout(() => {
      showError.value = false;
    }, 5000);

    felderClearen();
  } finally {
    e.preventDefault();
  }
}

//? ----------------------------------------------------------------

// const checkError = computed(() => {
//   return v$.value.$invalid == true ? true : false;
// });

// const checkErrorOTP = computed(() => {
//   return vOTP.value.$invalid == true ? true : false; s
// });

function felderClearen() {
  state.vorname = '';
  state.nachname = '';
  state.email = '';
  state.strasse_hnr = '';
  state.stadt = '';
  state.plz = '';
  state.telefon = '';
  state.password = '';
  state.c_password = '';
}

// OTP input, sehrt billig aber es geht
document.addEventListener('DOMContentLoaded', function (event) {
  function OTPInput() {
    const inputs = document.querySelectorAll('#otp > *[id]');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('keydown', function (event) {
        if (event.key === 'Backspace') {
          inputs[i].value = '';
          if (i !== 0) inputs[i - 1].focus();
        } else {
          if (i === inputs.length - 1 && inputs[i].value !== '') {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            inputs[i].value = event.key;
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            inputs[i].value = String.fromCharCode(event.keyCode);
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          }
        }
      });
    }
  }
  OTPInput();
});
</script>
