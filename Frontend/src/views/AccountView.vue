<template>
  <div>
    <Disclosure as="div" class="relative bg-sky-700 pb-32 overflow-hidden" v-slot="{ open }">
      <nav
        :class="[
          open ? 'bg-sky-900' : 'bg-transparent',
          'relative z-10 border-b border-teal-500 border-opacity-25 lg:bg-transparent lg:border-none',
        ]"
      >
        <DisclosurePanel class="bg-sky-900 lg:hidden">
          <div class="pt-2 pb-3 px-2 space-y-1">
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.href"
              :class="[
                item.current ? 'bg-black bg-opacity-25' : 'hover:bg-sky-800',
                'block rounded-md py-2 px-3 text-base font-medium text-white',
              ]"
              >{{ item.name }}</DisclosureButton
            >
          </div>
          <div class="pt-4 pb-3 border-t border-sky-800">
            <div class="flex items-center px-4">
              <div class="flex-shrink-0">
                <img class="rounded-full h-10 w-10" :src="user.imageUrl" alt="" />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-white">{{ user.name }}</div>
                <div class="text-sm font-medium text-sky-200">{{ user.email }}</div>
              </div>
              <button
                type="button"
                class="ml-auto flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:bg-sky-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-white"
              >
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="mt-3 px-2">
              <DisclosureButton
                v-for="item in userNavigation"
                :key="item.name"
                as="a"
                :href="item.href"
                class="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:text-white hover:bg-sky-800"
                >{{ item.name }}</DisclosureButton
              >
            </div>
          </div>
        </DisclosurePanel>
      </nav>
      <div
        aria-hidden="true"
        :class="[
          open ? 'bottom-0' : 'inset-y-0',
          'absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0',
        ]"
      >
        <div class="absolute inset-0 flex">
          <div class="h-full w-1/2" style="background-color: #0a527b" />
          <div class="h-full w-1/2" style="background-color: #065d8c" />
        </div>
        <div class="relative flex justify-center">
          <svg
            class="flex-shrink-0"
            width="1750"
            height="308"
            viewBox="0 0 1750 308"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#0369a1" />
            <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c" />
            <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
            <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#0a4f76" />
          </svg>
        </div>
      </div>
      <header class="relative py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-white">Settings</h1>
        </div>
      </header>
    </Disclosure>

    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { BellIcon } from '@heroicons/vue/outline';

import { PiniaStore } from '../Store/Store';
import { RouterView } from 'vue-router';
</script>
