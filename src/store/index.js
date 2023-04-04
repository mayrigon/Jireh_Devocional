import Vue from 'vue'
import Vuex from 'vuex'


const SET_BOOK = 'set-book'
const SET_CHAPTER = 'set-chapter'
const SET_VERSE = 'set-verse'
const SET_VERSE_LIST = 'set-verse-list'
const SET_TAB_MODEL = 'set-tab-model'
const NEW_DECLARATION = 'new-declaration'
// const EDIT_DECLARATION = 'edit-declaration'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedBook: '-',
    selectedChapter: '-',
    selectedVerse: '-',
    verseList: [],
    tabModel: null,
    declarationsList: [
      {
        id: Math.random().toString(36).substr(2, 5),
        title: 'Demo title',
        theme:  ["Fé", "Perdão"],
        description: 'Demo description' , 
        text: 'lorem' 
    }
  ]
  },
  getters: {
  },
  mutations: {
    [SET_BOOK] (state, payload) {
      state.selectedBook = payload
    },
    [SET_CHAPTER] (state, payload) {
      state.selectedChapter = payload
    },
    [SET_VERSE] (state, payload) {
      state.selectedVerse = payload
    },
    [SET_VERSE_LIST] (state, payload) {
      state.verseList = payload
    },
    [SET_TAB_MODEL] (state, payload) {
      state.tabModel = payload
    },
    [NEW_DECLARATION] (state, payload) {
      state.declarationsList.unshift(payload)      
    },
    editDeclaration: (state, editedItem) => {
      //receber o objeto alterado
      //console.log(editedItem)
      //Roda a lista em uma estrutura de repeticao para encontrar o item
      for (let index = 0; index < state.declarationsList.length; index++) {
        //Elemento da vez
        const element = state.declarationsList[index];
        //Compara os ids para verificar 
        if(editedItem.id === element.id ){
          //atualizar o objeto
          state.declarationsList[index] = editedItem
        }
      }
      //Clona o array original to trigger the UI update
      state.declarationsList = [...state.declarationsList]
    },
    deleteDeclaration: (state, editedItem) => {

      // [
      //   index = 0, {declaracao_1},
      //   index = 1, {declaracao_2},
      //   index = 2, {declaracao_3},
      // ]

      //Map:
      state.declarationsList.map((currentValue,index) => {        
        if(editedItem.id === currentValue.id) {
            state.declarationsList.splice(index, 1)
        }
      })


      //Foreach: menos verboso que o for, utilizado para fazer o looping 
      //(ler/percorrer) os itens de um array. aplicando uma função para cada item.
      // state.declarationsList.forEach(function(currentValue,index) {
      //   console.log('Inicio do forEach')
      //   console.log('Index: ' + index)
      //   //Enviado
      //   console.log('Item enviado: ' + editedItem.id)

      //   //Corrente
      //   console.log('Item da vez: ' + currentValue.id)
      //   //Comparar o id enviado com o id corrente
      //   //para saber qual id é igual e será deletado
      //   if(editedItem.id === currentValue.id) {
      //   //deletar o item da lista pela propriedade (id) 
      //    console.log('é esse aqui: ' + currentValue.id)
      //    //Deleta o item da lista
      //    state.declarationsList.splice(index, 1)
      //   }
      //   console.log('Fim do forEach')
      // })


       



    }

          //console.log(payload)
      // for (let index = 0; index < state.declarationsList.length; index++) {
      //   const currentValue = state.declarationsList[1];
      //   if(payload.id === currentValue.id) {
      //     state.declarationsList.splice(index,1)
      //   }
      // }

     
     
      //state.declarationsList.forEach
      
      //state.declarationsList.Map
      
      //state.declarationsList.Filter





















































     
  },
  actions: {

  },
  modules: {
    
  }
})
