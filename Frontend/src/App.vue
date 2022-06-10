<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex justify-between h-16">
        <!-- <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
         
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div> -->

        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
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
                  class="h-8 w-8 rounded-full"
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
      </div>
    </div>
  </Disclosure>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { MenuIcon, XIcon } from '@heroicons/vue/outline';
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import NoSleep from 'nosleep.js';

import { PiniaStore } from './Store/Store.js';
const store = PiniaStore();
const router = useRouter();

onMounted(async () => {
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
