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
    userServiceWorker: null,
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
    getServiceWorker(state) {
      return state.userServiceWorker;
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
    changeAktivenUser(user) {
      this.aktiverUser = user;

      SaveState();
    },

    //---------ServiceWorker----------
    async connectToServiceWorker(ws_devMode) {
      //Client verbindet sich mit SW
      let registration = await navigator.serviceWorker.getRegistration('/service_worker_chs.js');

      //VerbindungsMessage zum Websocket schicken
      registration.active.postMessage(
        JSON.stringify({
          type: 'userConnect',
          userId: this.getAktivenUser.k_id,
          payload: { email: this.getAktivenUser.email, ws_devMode },
        }),
      );

      this.userServiceWorker = registration;
    },

    async disconnectFromServiceWorker() {
      if (!this.userServiceWorker) return console.log('ServiceWorker nicht vorhanden');

      //Verbindung schließen
      this.userServiceWorker.active.postMessage(
        JSON.stringify({
          type: 'userDisconnect',
          userId: this.getAktivenUser.k_id,
          payload: 'kein Payload dabei',
        }),
      );

      await this.userServiceWorker.unregister();

      this.userServiceWorker = null;
    },
  },
});
