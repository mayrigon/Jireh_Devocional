<template>
  <v-data-table :headers="headers" :items="declarationsList" >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Lista de Declarações</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" width="800px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"              
            >Nova Declaração</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
             <span class="text-h5">{{ formTitle }}</span>
             </v-card-title>
            <v-card-text>
              <v-container>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="editedItem.title"
                    class="ma-2"
                    label="Título"
                    outlined
                    dense
                    color="black"
                  >
                  </v-text-field>
                  <v-combobox
                    color="black"
                    class="ma-2"
                    v-model="editedItem.theme"
                    :items="items"
                    label="Tema"
                    persistent-hint
                    small-chips
                    item-color="black"
                    outlined
                    dense
                  >
                  </v-combobox>
                  <v-text-field
                    v-model="editedItem.description"
                    class="ma-2"
                    label="Descrição"
                    outlined
                    dense
                    color="black"
                  >
                  </v-text-field>
                  <v-textarea
                    v-model="editedItem.text"
                    color="black"
                    class="ma-2"
                    outlined
                    name="input-7-4"
                    label="Inserir Texto"
                    value=""
                  >
                  </v-textarea>
                </v-col>
              </v-container>
              <v-row>
                <v-row align="center" class="ma-2" justify="end">
                  <div class="pr-3">
                    <v-btn @click="submit" dark>Salvar</v-btn>
                  </div>
                  <v-btn dark @click="close">Fechar</v-btn>
                </v-row>
              </v-row>
            </v-card-text>
          </v-card>
          <v-spacer></v-spacer>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Você tem certeza que deseja deletar este item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="black" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>


    
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import CadastroDeclaracao from "../models/CadastroDeclaracao";
import { mapState } from 'vuex'

export default {
  name: "CadastroPage",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      title: "",
      theme: "",
      description: "",
      text: "",
      teste: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Título", value: "title", sortable: false},
        { text: "Tema", value: "theme", sortable: false },
        { text: "Descrição", value: "description", sortable: false},
        { text: "Actions", value: "actions", sortable: false },
      ],      
      editedIndex: -1,
      editedItem: {
        title: '',
        theme: '',
        description: '',
        text: '',
      },
      defaultItem: {
        title: '',
        theme: '',
        description: '',
        text: '',
      },
      items: [
        "Fé",
        "Perdão",
        "Amor",
        "Paz",
        "Cura",
        "Casamento",
        "Gratidão",
        "Motivação",
        "Reflexão",
        "Amizade",
        "Luto",
        "Ansiedade",
        "Medo",
        "Esperança",
        "Insegurança",
      ],
    };
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nova Declaração' : 'Editar Declaração'
    },
    ...mapState(['declarationsList'])
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {

    },
    submit() {
      const cadastro = new CadastroDeclaracao(
        this.editedItem.title,
        this.editedItem.theme,
        this.editedItem.description,
        this.editedItem.text
      );
    
      if (this.editedIndex > -1) {
       //Chamar a mutation e passar o objeto alterado
        this.$store.commit("editDeclaration", this.editedItem)

       // Object.assign(this.$store.state.declarationsList[this.editedIndex], this.editedItem)
      } else {
        this.$store.commit("new-declaration", cadastro);
      }
      this.dialog = false 
    },
    editItem (item) {
      //console.log(item)
      this.editedIndex = this.$store.state.declarationsList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.$store.state.declarationsList.indexOf(item)      
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      
      this.$store.commit("deleteDeclaration", this.editedItem)
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    // save () {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.$store.state.declarationsList[this.editedIndex], this.editedItem)
    //   } else {
    //     this.$store.state.declarationsList.push(this.editedItem)
    //   }
    //   this.close()
    // },
  },
};
</script>

<style>
</style>