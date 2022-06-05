<template>
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
        src="../../public/Coming-Home-Safe-Icon.webp"
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
              <a href="#" class="font-medium text-teal-600 hover:text-teal-500">
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
import { XCircleIcon } from '@heroicons/vue/outline';
import { XIcon } from '@heroicons/vue/solid';

import { reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import useValidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

import { PiniaStore } from '../Store/Store';
const store = PiniaStore();

const router = useRouter();
const showError = ref(false);

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

      if (res.status == 201) {
        store.setAktivenUser(res.data);

        router.push('/account');
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

const checkError = computed(() => {
  return v$.value.$invalid == true ? true : false;
});
</script>
