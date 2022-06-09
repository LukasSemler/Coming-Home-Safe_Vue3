<template>
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
                <p class="mt-1 text-sm text-gray-500">Das Passwort wurde erfolgreich geändert</p>
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
                v-for="item in subNavigation"
                :key="item.name"
                @click="$router.push(item.href)"
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
          <div class="lg:col-span-9 mt-12 mx-2">
            <h1 class="text-center text-2xl">Passwort ändern</h1>
            <p class="text-center mt-2">Hier können Sie Ihr Passwort ändern</p>

            <form class="space-y-6 mt-6">
              <div>
                <div>
                  <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
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

              <div>
                <button
                  @click="changePW"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Ändern
                </button>
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
import useValidate from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';
import axios from 'axios';
import { reactive, computed, ref } from 'vue';
import { PiniaStore } from '../../Store/Store.js';

const store = PiniaStore();

const subNavigation = [
  { name: 'Account', href: '/account', icon: UserCircleIcon, current: false },
  { name: 'Password', href: '/account/password', icon: KeyIcon, current: true },
  { name: 'Delete Account', href: '/account/deleteAccount', icon: TrashIcon, current: false },
];

const showSuccess = ref(false);
const showError = ref(false);

// Variablen for input erstellen
const state = reactive({
  password: '',
  c_password: '',
});

// Rules for vuelidate
const rules = computed(() => {
  return {
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

const v$ = useValidate(rules, state);

async function changePW(e) {
  e.preventDefault();
  try {
    v$.value.$validate();

    if (!v$.value.$error) {
      // Register erledigen
      const result = await axios.patch(`/changePassword/${store.getAktivenUser.k_id}`, {
        password: state.password,
      });

      state.c_password = '';
      state.c_password = '';

      store.setAktivenUser(result.data);

      showSuccess.value = true;

      setTimeout(() => (showSuccess.value = false), 3000);
    } else console.log('Nicht alle Felder ausgefüllt');
  } catch (error) {
    showError.value = true;

    setTimeout(() => (showError.value = false), 3000);
    console.log(error.message);
  }
}
</script>
