<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>Bíblia | NVI</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <TabsComponent />
      </v-col>
      <v-col cols="9">
        <v-row>
          <v-col cols="12">
            <div class="text-left">
              <v-btn @click="goToTabBook" class="ma-1" large dark>
                {{ $store.state.selectedBook }}
              </v-btn>
              <v-btn @click="goToTabChapter" class="ma-1" large dark
                >Capítulo | {{ $store.state.selectedChapter }}</v-btn
              >
              <v-btn @click="goToTabVerse" class="ma-1" large dark
                >Versículo | {{ $store.state.selectedVerse }}</v-btn
              >
            </div>
          </v-col>
        </v-row>
        <v-row class="pageScroll">
          <v-col cols="12">
            <p
              v-for="v in $store.state.verseList"
              :key="v.verse"
              :class="isSelected == v.verse ? 'highlight' : ''"
              :ref="v.verse"
            >
              <strong> {{ v.verse }} </strong> - {{ v.verses }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TabsComponent from "../components/TabsComponent.vue";

export default {
  name: "VersiculoPage",
  components: { TabsComponent },
  data() {
    return {
      isSelected: null,
    };
  },
  watch: {
    "$store.state.selectedVerse": function () {
      this.isSelected = this.$store.state.selectedVerse;
      const el = this.$refs[this.$store.state.selectedVerse];
      el[0].scrollIntoView({ behavior: "smooth" });
    },    
  },
  methods: {
    goToTabBook() {
      this.$store.state.tabModel = 0
    },
    goToTabChapter() {
      this.$store.state.tabModel = 1
    },
    goToTabVerse() {
      this.$store.state.tabModel = 2
    }
  },
};
</script>

<style>
.highlight {
  background-color: rgb(219, 219, 219);
}
.pageScroll {
  max-height: 780px;
  overflow-x: hidden;
}

html {
  overflow-y: auto;
}

</style>
