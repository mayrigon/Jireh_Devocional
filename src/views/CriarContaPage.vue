<template>
  <v-app>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="12" md="4" class="mx-auto">
        <v-card class="pa-4">
          <div class="text-center">
            <v-avatar size="65" color="grey lighten-1">
              <v-icon size="40" color="black">mdi-account</v-icon>
            </v-avatar>
          </div>
          <v-form ref="form" v-model="valid">
            <br>
            <v-card-title class="justify-center">Cadastro</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="nome"
                :rules="regraNome"
                type="text"
                label="Nome"
                placeholder="Nome"
                prepend-inner-icon="mdi-account"
                required
              />
              <v-text-field
                v-model="email"
                :rules="regraEmail"
                type="email"
                label="Email"
                placeholder="Email"
                prepend-inner-icon="mdi-email"
                required
              />
              <v-text-field
                v-model="senha"
                :rules="regraSenha"
                :type="mostrarSenha ? 'text' : 'password'"
                label="Senha"
                placeholder="Senha"
                prepend-inner-icon="mdi-key"
                :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="mostrarSenha = !mostrarSenha"
                required
              />
            </v-card-text>
          </v-form>
          <v-card-actions class="justify-center">
            <v-btn @click="criarConta" depressed class="black white--text" v-show="!isLoading"
              >Criar Conta</v-btn
            >
            <v-progress-circular indeterminate v-show="isLoading"></v-progress-circular>
          </v-card-actions>
          <p class="align-center error-message" v-show="errorMsg">Não foi possível criar sua conta. Tente novamente mais tarde</p>
          <br />
          <a
            class="align-center"
            href
            @click.prevent="mostrarRegistro = !mostrarRegistro"
          >
            <span @click="irLogin">Já tem cadastro? Acesse o Login!</span>
          </a>
        </v-card>
      </v-col>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default {
  name: "CriarContaPage",
  data: () => ({
    mostrarSenha: false,
    valid: true,
    isLoading: false,
    nome: "",
    regraNome: [
      (v) => !!v || "Campo obrigatório",
      (v) => (v && v.length <= 20) || "O nome deve ter menos de 20 caracteres",
      
    ],
    senha: "",
    regraSenha: [(v) => !!v || "Campo obrigatório"],
    email: "",
    errorMsg: false,
    regraEmail: [
      (v) => !!v || "Campo obrigatório",
      (v) => /.+@.+/.test(v) || "E-mail inválido",
    ],
  }),
  methods: {
    criarConta() {
      this.$refs.form.validate();
      if (this.valid) {
        //Exibir o loading
        this.isLoading = true
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.senha)
          .then(() => {
            // Signed in 
            updateProfile(auth.currentUser, {
              displayName: this.nome
            }).then(() => {
              // Profile updated!
              //Hide loading
              this.isLoading = false            
              // ...
            }).catch((error) => {
              //Hide loading
              this.isLoading = false
              console.log(error)
              // An error occurred
              // ...
            });
          })
          .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            //hide loading
            this.isLoading = false
            //Mostra a mensagem de erro
            this.errorMsg = true
            // console.log("Erro")
            console.log(error)
            // ..
          });
      }
    },
    irLogin() {
      this.$router.push({ path: '/login'})
    }
  },
};
</script>

<style>
.align-center {
    display: flex;
    justify-content: center;
  }
</style>