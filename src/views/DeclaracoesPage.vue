<template>
  <v-container fluid>
    <h1>Declarações {{ $store.state.declarationsList.length}}</h1>
    <br />
    <v-row>
      <v-col cols="12" md="3" v-for="item in $store.state.declarationsList" :key="item.id">
        <v-card class="mx-auto" max-width="344">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px">
          </v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>
            <v-chip small label dark>{{ item.theme }}</v-chip>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>
          
          <v-card-text>{{ item.description }}</v-card-text>

          <v-row justify="center" class="pb-2 pt-2">
            <v-card-actions>
              <v-btn dark @click="showModal(item)"> Começar </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-row>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" width="800px">
        <v-card>
          <v-card-title>
            <span class="text-h5"><strong>{{ selectedItem.title }}</strong></span>
          </v-card-title>
          <v-card-text class="text-h7">{{ selectedItem.text }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="dialog = false"> Fechar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "DeclaracoesPage",
  data() {
    return {
      dialog: false,
      selectedItem: {}
    };
  },
  methods:{
    showModal(item){
      this.dialog = true
      this.selectedItem = item
    }
  }
};
</script>

<style>
</style>