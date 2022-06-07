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
  state: () => ({
    aktiverUser: null,
  }),
  //Getter
  getters: {
    getAktivenUser() {
      return this.aktiverUser;
    },
    isAdmin() {
      try {
        return this.aktiverUser.isAdmin ? true : false;
      } catch (error) {
        return false;
      }
    },
  },
  //Actions
  actions: {
    setAktivenUser(user) {
      this.aktiverUser = user;

      SaveState();
    },
    deleteAktivenUser() {
      this.aktiverUser = null;
      SaveState(true);
    },
  },
});
