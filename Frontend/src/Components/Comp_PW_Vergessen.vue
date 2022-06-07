<template>
  <!--Modal-->
  <TransitionRoot as="template" :show="showFeedbackModal">
    <Dialog as="div" class="relative z-10" @close="showFeedbackModal = false">
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
              class="relative bg-white w-80 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6"
            >
              <div>
                <div
                  :class="
                    modalFeedbackError
                      ? 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'
                      : 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'
                  "
                >
                  <MailIcon
                    :class="modalFeedbackError ? 'text-red-500 h-6 w-6' : 'text-green-500 h-6 w-6'"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    {{ modalFeedbackTitle }}
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500 mb-3">
                      {{ modalFeedbackText }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 bg-teal-500">
                <button
                  type="button"
                  :class="
                    modalFeedbackError
                      ? 'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none  sm:col-start-2 sm:text-sm'
                      : 'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:col-start-2 sm:text-sm'
                  "
                  @click="closeModal"
                >
                  Verstanden
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!--Standartansicht-->
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="/Coming-Home-Safe-Icon.webp" alt="Electronic City" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Passwort vergessen</h2>
      <h4 class="mx-16 mt-6 text-center text-sm font-small text-gray-900 sm:mx-0">
        Falls du dein Passwort vergessen hast, kannst du hier deinen Account wiederherstellen!
      </h4>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email-Adresse
            </label>
            <div class="mt-1">
              <input
                v-model="inputState.email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="max@mustermann.at"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />

              <p
                v-if="v$.email.$invalid && inputState.email.length > 0"
                class="mt-2 text-sm text-red-600"
                id="email-error"
              >
                Bitte gib hier eine gültige Email-Adresse ein.
              </p>
            </div>
          </div>

          <div>
            <button
              @click="pw_vergessen_clicked"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { MailIcon } from '@heroicons/vue/outline';

import useValidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import axios from 'axios';
import { useRouter } from 'vue-router';

//Variablen
const router = useRouter();

const showFeedbackModal = ref(false);
const modalFeedbackTitle = ref('Titel');
const modalFeedbackText = ref('Text');
const modalFeedbackError = ref(false);

let inputState = reactive({
  email: '',
});
const inputRules = computed(() => {
  return {
    email: { required, email },
  };
});
const v$ = useValidate(inputRules, inputState);

//----Funktionen----

//Funktion zum öffnen des Modals und der Passwortänderung
async function pw_vergessen_clicked() {
  console.log('VALID: ' + (await v$.value.$validate()));

  const isValid = await v$.value.$validate();

  if (isValid) {
    const { status } = await axios.post('/sendNewPassword', { email: inputState.email });
    if (status == 200) {
      modalFeedbackTitle.value = 'Ein voller Erfolg!';
      modalFeedbackText.value =
        'Du wirst binnen weniger Sekunden eine neue Email von uns in deinem Postfach erhlaten! Mit diesem Passwort kannst du deinen Account wiederherstellen.';
      showFeedbackModal.value = true;
      modalFeedbackError.value = false;
    } else {
      modalFeedbackTitle.value = 'Da ist was schief gelaufen!';
      modalFeedbackText.value =
        'Leider ist etwas schief gelaufen. Bitte überprüfe deine Eingaben und versuch es erneut.';
      showFeedbackModal.value = true;
      modalFeedbackError.value = true;
    }
  } else {
    modalFeedbackTitle.value = 'Da ist was schief gelaufen!';
    modalFeedbackText.value =
      'Leider ist etwas schief gelaufen. Bitte überprüfe deine Eingaben und versuch es erneut.';
    showFeedbackModal.value = true;
    modalFeedbackError.value = true;
  }
}

//Wenn man im Modal auf verstanden clickt
function closeModal() {
  if (!modalFeedbackError.value) {
    router.push('/');
  }
  //Modal zurücksetzen
  modalFeedbackTitle.value = '';
  modalFeedbackText.value = '';
  showFeedbackModal.value = false;
  modalFeedbackError.value = false;

  //Input clearen
  inputState.email = '';
}
</script>
