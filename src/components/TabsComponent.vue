<template>
  <v-card >
    <v-tabs v-model="$store.state.tabModel" dark grow>
      <!-- <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>       -->
      <v-tab>Livro</v-tab>
      <v-tab :disabled="clickTabBook">Capítulo</v-tab>
      <v-tab :disabled="clickTabChapters">Versículo</v-tab>
    </v-tabs>
    <v-tabs-items v-model="$store.state.tabModel">
      <v-tab-item>
       <v-text-field
        class="ma-3"
        clearable
        v-model="searchBook"
        append-icon="mdi-magnify"
        label="Digite aqui o capítulo"
        color="black"
        single-line
        hide-details
      ></v-text-field>
      <br>
        <v-data-table
          @click:row="goToChapterTabAndCreateChaptersList"
          :headers="headers"
          :items="books"
          :search="searchBook"
          :items-per-page="66"
          hide-default-header
          hide-default-footer
          class="elevation-1 pageSize"               
        >
        </v-data-table>
      </v-tab-item>
      <v-tab-item>
       <v-text-field
        class="ma-3"
        clearable
        v-model="searchChapter"
        append-icon="mdi-magnify"
        label="Digite aqui o capítulo"
        single-line
        hide-details
      ></v-text-field>
      <br>
        <v-data-table
          @click:row="goToVersesTabAndCreateVersesList"
          :headers="headersChapters"
          :items="chapters"
          :search="searchChapter"
          :items-per-page="200"
          item-key="cap"
          hide-default-header
          hide-default-footer
          class="elevation-1 pageSize" 
        >
        <template v-slot:body="{ items }">
          <tbody>
            <tr :class="key === selectedRow ? 'custom-highlight-row' : ''" @click="rowSelect(key,item)" v-for="(item, key) in items" :key="item.cap">
              <td>{{ item.cap }}</td>
            </tr>
          </tbody>
        </template>  
        </v-data-table>
      </v-tab-item>
      <v-tab-item>
       <v-text-field
        class="ma-3"
        clearable
        v-model="searchVerses"
        append-icon="mdi-magnify"
        label="Digite aqui o versículo"
        single-line
        hide-details
      ></v-text-field>
      <br>
        <v-data-table
          @click:row="selectVerse"
          :headers="headersVerses"
          :items="verses"
          :search="searchVerses"
          :items-per-page="200"
          hide-default-header
          hide-default-footer
          class="elevation-1 pageSize"
          :single-select="true"
          >          
        </v-data-table>      
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import biblia from '../data/nvi.json'

export default {
  name: "TabsComponent",
  data() {
    return {
      selectedRow: null,
      tab: null,
      clickTabBook: true,
      clickTabChapters: true,
      searchBook: '',
      searchChapter: '',
      searchVerses: '',
      items: ["Livro", "Capítulo", "Versículo"],
      headers: [
        {
          text: "Book",
          value: "name",
        },
      ],
      headersChapters: [
        {
          text: "chapter",
          value: "cap",
        },
      ],
      headersVerses: [
        {
          text: "verse",
          value: "verse",
        }
      ],
      books: biblia,
      chapters: [],
      verses: [],
    };
  },
  methods: {
    goToChapterTabAndCreateChaptersList(row) {
       //console.log()
      //Commitar a mutation enviando o nome do livro no payload
      this.$store.commit('set-book', row.name)

      //Quando clicar na lista do livro, precisa mudar para a tab capitulo
      this.$store.state.tabModel = 1;
      //Habilita a tab capítulo ao clicar
      this.clickTabBook = false;
      //Reiniciar/limpar o valor array
      this.chapters = []
      //Quando clicar no item da lista, precisa aparecer a quantidade de capitulos,
      //criei um loop com uma condição de limitar a quantidade de linhas da repetição, usando como parametro o row.chapters enviado no click do data table (@click:row)
      
      for (let i = 0; i < row.chapters.length; i++) {
        this.chapters.push({ cap: i + 1 , verses: row.chapters[i]});
      }
      //Fazer a chamada http carregando o primeiro cap do livro selecionado
      // fetch(" https://www.abibliadigital.com.br/api/books/mt")
      //   .then((res) => res.json())
      //   .then((data) => console.log(data));
    },
    goToVersesTabAndCreateVersesList(row) {
      // console.log(row.cap)
      //Commitar a mutation enviando o numero do capitulo no payload
      this.$store.commit('set-chapter', row.cap)

      //Quando clicar na lista do livro, precisa mudar para a tab capitulo
      this.$store.state.tabModel = 2;
      //Habilita a tab capítulo ao clicar
       this.clickTabChapters = false;
      //Reiniciar/limpar o valor array
       this.verses = []
       //Quando clicar no item da lista, precisa aparecer a quantidade de versiculos,
      //criei um loop com uma condição de limitar a quantidade de linhas da repetição, usando como parametro o row.verses enviado no click do data table (@click:row)
      for (let i = 0; i < row.verses.length; i++) {
        this.verses.push({ verse: i + 1 , verses: row.verses[i]});
      }
      
      this.$store.commit('set-verse-list', this.verses)


    },
    selectVerse(row) {
      // console.log(row.verse)
      //Commitar a mutation enviando o numero do versiculo selecionado no payload
      this.$store.commit('set-verse', row.verse)
    },
    rowSelect(idx,item) {
      this.selectedRow = idx
      this.goToVersesTabAndCreateVersesList(item)
    }
  },  
};
</script>

<style>
  .custom-highlight-row {
    background-color: rgb(219, 219, 219);
  }
  .pageSize {
    max-height: 700px;
    overflow-x: hidden;
    
  }

</style>