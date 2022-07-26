<template>
  <TransitionRoot as="template" :show="!internetVorhanden">
    <Dialog as="div" class="relative z-10" @close="internetVorhanden = false">
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
                  class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
                >
                  <StatusOfflineIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    Kein Internet
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Oh, wie es scheint hast du keine Verbindung zum Internet, ändere das bite um
                      unsere App verwenden zu können :(
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="flex max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 justify-end p-2 sm:py-4">
      <!-- <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
         
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div> -->

      <!-- Profile dropdown -->
      <Menu as="div" class="ml-3 relative">
        <div>
          <MenuButton
            v-if="store.getAktivenUser"
            class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <span class="sr-only">Open user menu</span>
            <img
              crossorigin="anonymous"
              async
              class="h-10 w-10 rounded-full"
              :src="store.aktiverUser.link_thumbnail"
              alt=""
            />
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            v-if="store.isAdmin"
            class="z-40 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <MenuItem v-slot="{ active }">
              <a
                @click="router.push('/mitarbeiterMap')"
                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                >Track User</a
              >
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                @click="router.push('/account')"
                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                >Account</a
              >
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                @click="abmelden"
                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                >Sign out</a
              >
            </MenuItem>
          </MenuItems>

          <MenuItems
            v-else
            class="z-40 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <MenuItem v-slot="{ active }">
              <a
                @click="router.push('/userMap')"
                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                >Tracking</a
              >
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                @click="router.push('/account')"
                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                >Account</a
              >
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                @click="abmelden"
                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                >Sign out</a
              >
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </Disclosure>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { MenuIcon, XIcon } from '@heroicons/vue/outline';
import { RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import NoSleep from 'nosleep.js';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { StatusOfflineIcon } from '@heroicons/vue/outline';

import { PiniaStore } from './Store/Store.js';
const store = PiniaStore();
const router = useRouter();

let internetVorhanden = ref(true);

onMounted(async () => {
  //Check if Internet is available
  console.log('Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line');
  if (window.navigator.onLine) internetVorhanden.value = true;
  else internetVorhanden.value = false;

  window.addEventListener('online', () => {
    console.log('Became online');
    internetVorhanden.value = true;
  });
  window.addEventListener('offline', () => {
    console.log('Became offline');
    internetVorhanden.value = false;
  });

  //PWA
  const { offlineReady, updateServiceWorker, needRefresh } = await useRegisterSW();

  if (localStorage.getItem(store.$id)) {
    store.$state = JSON.parse(localStorage.getItem(store.$id));
  }

  //NoSleep
  let noSleep = new NoSleep();
  noSleep.disable();
  await noSleep.enable();
});

function abmelden() {
  //User vom ServiceWorker abmelden
  store.disconnectFromServiceWorker();

  //Eingeloggten User im Store entfernen
  store.deleteAktivenUser();

  router.push('/');
}
</script>
