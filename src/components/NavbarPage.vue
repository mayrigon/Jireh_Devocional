<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
      dark
    >
      <v-list-item class="px-2">
        <v-list-item-title class="text-h6" style="padding: 10px 0px 0px 5px"
          ><strong>Jireh.</strong></v-list-item-title
        >
        <br />
        <br />
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          class="white--text"
          router
          :to="item.route"
          @click="item.click"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "NavbarPage",
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Bíblia",
          icon: "mdi-book-cross",
          route: "/",
          click: this.fakefunction,
        },
        {
          title: "Declarações",
          icon: "mdi-cards-playing-heart-multiple-outline",
          route: "/declaracoes",
          click: this.fakefunction,
        },
        {
          title: "Cadastro de Declarações",
          icon: "mdi-file-plus-outline",
          route: "/cadastro",
          click: this.fakefunction,
        },
        { title: "Sair", icon: "mdi-logout", click: this.logOut },
      ],
      mini: true,
    };
  },
  methods: {
    logOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("usuario deslogado");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    fakefunction() {},
  },
};
</script>

<style>
</style>