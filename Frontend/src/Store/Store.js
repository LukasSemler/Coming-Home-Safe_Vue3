import { defineStore } from 'pinia';

//Die Funktion läuft intern bei allen actions ab um den State im localstorage zu speichern
function SaveState(abmelden) {
  const store = PiniaStore();

  //State speichern
  if (store.aktiverUser != null) {
    localStorage.setItem(store.$id, JSON.stringify(store.$state));
  } else if (abmelden) {
    localStorage.setItem(store.$id, JSON.stringify(store.$state));
  }
}

//MainStore
export const PiniaStore = defineStore('Coming-Home-Safe', {
  //State
  state: () => ({}),
  //Getter
  getters: {},
  //Actions
  actions: {},
});
