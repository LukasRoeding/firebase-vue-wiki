<template>
  <div id="app">
    {{ firebaseData }}
    {{ formData }}
    <div v-if="state === 'synced'">
      Form is synced with Firestore
    </div>
    <div v-else-if="state === 'modified'">
      From data changed, will sync with Firebase
    </div>
    <div v-else-if="state === 'revoked'">
      From data and Firebase revoked to original data
    </div>
    <div v-else-if="state === 'error'">
      Failed to save to Firestore. {{ errorMessage }}
    </div>
    <div v-else-if="state === 'loading'">Loading...</div>
    <form @submit.prevent="updateFirebase">
      <input type="text" name="name" v-model="formData.name" />
      <input type="email" name="name" v-model="formData.email" />
      <input type="tel" name="name" v-model="formData.phone" />
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>
<script>
import { db } from "@/main.js";
import { debounce } from "debounce";

const documentPath = "contacts/jeff";

export default {
  data() {
    return {
      state: "loading",
      firebaseData: null,
      formData: {},
      errorMessage: ""
    };
  },
  async created() {
    const docRef = db.doc(documentPath);

    let data = (await docRef.get()).data();

    if (!data) {
      data = { name: "", phone: "", email: "" };
      docRef.set(data);
    }

    this.formData = data;
    this.state = "synced";
  },
  firestore() {
    return {
      firebaseData: db.doc(documentPath)
    };
  },
  methods: {
    async updateFirebase() {
      try {
        await db.doc(documentPath).set(this.formData);
        this.state = "synced";
      } catch (error) {
        this.errorMessage = JSON.stringify(error);
        this.state = "error";
      }
    },
    fieldUpdate() {
      this.state = "modified";
      this.debouncedUpdate();
    },
    debouncedUpdate: debounce(function() {
      this.updateFirebase();
    }, 1500)
  }
};
</script>
<style></style>
