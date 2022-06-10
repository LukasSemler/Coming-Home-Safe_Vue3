<template>
  <TransitionRoot as="template" :show="showOTP">
    <Dialog as="div" class="relative z-10" @close="showOTP = false">
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
                    <p class="text-sm text-gray-500 mb-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet assumenda
                      fuga ducimus debitis esse impedit dolor
                    </p>

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
                        class="m-2 border h-10 w-10 text-center form-control rounded"
                        type="text"
                        id="first"
                        maxlength="1"
                      />
                      <input
                        v-model="state2.char2"
                        class="m-2 border h-10 w-10 text-center form-control rounded"
                        type="text"
                        id="second"
                        maxlength="1"
                      />
                      <input
                        v-model="state2.char3"
                        class="m-2 border h-10 w-10 text-center form-control rounded"
                        type="text"
                        id="third"
                        maxlength="1"
                      />
                      <input
                        v-model="state2.char4"
                        class="m-2 border h-10 w-10 text-center form-control rounded"
                        type="text"
                        id="fourth"
                        maxlength="1"
                      />
                      <input
                        v-model="state2.char5"
                        class="m-2 border h-10 w-10 text-center form-control rounded"
                        type="text"
                        id="fifth"
                        maxlength="1"
                      />
                      <input
                        v-model="state2.char6"
                        class="m-2 border h-10 w-10 text-center form-control rounded"
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
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  @click="loginOTP"
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
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  @click="showOTP = false"
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
                  There was an error when logging in. Please try again.
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
  <!-- ------------------------------------------------------------------------------------------------------------ -->

  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="/WebsiteIcons/Coming-Home-Safe-Icon.webp"
        alt="Electronic City"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email-Adresse
            </label>
            <div class="mt-1">
              <input
                v-model="state.email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />

              <p v-if="v$.email.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                {{ v$.email.$silentErrors[0].$message }}
              </p>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Passwort </label>
            <div class="mt-1">
              <input
                v-model="state.password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />

              <p v-if="v$.password.$invalid" class="mt-2 text-sm text-red-600" id="email-error">
                {{ v$.password.$silentErrors[0].$message }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a
                @click="router.push('/register')"
                class="font-medium text-teal-600 hover:text-teal-500 underline"
              >
                Erstellen Sie ein Konto
              </a>
            </div>

            <div class="text-sm">
              <a
                @click="$router.push('/pw_vergessen')"
                class="font-medium text-teal-600 hover:text-teal-500"
              >
                Passwort vergessen ?
              </a>
            </div>
          </div>

          <div>
            <button
              v-if="!checkError"
              @click="login"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Sign in
            </button>

            <button
              :disabled="checkError"
              v-else
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Sign in
            </button>
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

import { reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import useValidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

import { PiniaStore } from '../Store/Store';
const store = PiniaStore();

//* MUSS IMMER UMGESTELLT WERDEN WENN MAN DEPLOYED
let devmode = ref(true);

const router = useRouter();
let showError = ref(false);
let showOTP = ref(false);
let code = ref('');
let userVonDB = ref(null);
const state2 = reactive({
  char1: '',
  char2: '',
  char3: '',
  char4: '',
  char5: '',
  char6: '',
});

// Inputs
let state = reactive({
  email: '',
  password: '',
});

// Rules for vuelidate
const rules = computed(() => {
  return {
    email: { required, email },
    password: { required },
  };
});

const v$ = useValidate(rules, state);

async function login(e) {
  e.preventDefault();
  try {
    v$.value.$validate();

    if (!v$.value.$error) {
      const res = await axios.post('http://localhost:2410/login', {
        email: state.email,
        password: state.password,
      });

      console.log(res.data);
      userVonDB.value = res.data.foundUser;

      if (res.status == 200 && res.data.code == 'kein Admin') {
        // store.aktiverUser = res.data.foundUser;
        store.setAktivenUser(userVonDB.value);

        //Kunde mit ServiceWorker verbinden + übergabe ob DEV true oder false ist
        store.connectToServiceWorker(devmode.value);

        router.push('/usermap');
      } else {
        code.value = res.data.code;
        console.log('Code: ', code.value);

        showOTP.value = true;
      }
    } else {
      console.log('Fehler');
    }

    e.preventDefault();
  } catch (error) {
    e.preventDefault();
    console.log(error.message);

    showError.value = true;

    setTimeout(() => {
      showError.value = false;
    }, 5000);
  } finally {
    e.preventDefault();
  }
}

function loginOTP() {
  if (
    code.value ==
    `${state2.char1}${state2.char2}${state2.char3}${state2.char4}${state2.char5}${state2.char6}`
  ) {
    store.setAktivenUser(userVonDB.value);

    //TODO Mitarbeiter mit ServiceWorker verbinden --> Glaube da können noch Fehler auftreten (Benni macht das)
    store.connectToServiceWorker(devmode.value);

    router.push('/mitarbeiterMap');
  } else showError.value = true;
}

const checkError = computed(() => {
  return v$.value.$invalid == true ? true : false;
});
</script>
