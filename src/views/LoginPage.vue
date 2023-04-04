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
            <v-card-title class="justify-center">Login</v-card-title>
            <v-card-text>
              <v-text-field
                @focus="errorMsg = false"
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
            <v-btn @click="login" depressed class="black white--text" v-show="!isLoading"
              >Entrar</v-btn
            >
            <v-progress-circular indeterminate v-show="isLoading"></v-progress-circular>
          </v-card-actions>
          <p class="align-center error-message" v-show="errorMsg">Não foi possível efetuar o login</p>
          <br>
              <a class="align-center">                
                <span @click="irRegistro"> Não tem cadastro? Cadastre-se aqui!</span>
              </a>
        </v-card>
      </v-col>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default {
  name: "LoginPage",
  data: () => ({
    mostrarRegistro: false,
    mostrarSenha: false,
    valid: true,
    isLoading: false,
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
    login() {
      //Valida o form
      this.$refs.form.validate();
      //Se tiver válido faz a chamada de autenticação para o firebase
      if (this.valid) {
          //Exibir o loading
          this.isLoading = true
          const auth = getAuth();
          signInWithEmailAndPassword(auth, this.email, this.senha)
          .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          //Hide loading
          this.isLoading = false

        })
        .catch((error) => {
          //hide loading
          this.isLoading = false

          //  const errorCode = error.code;
          //  const errorMessage = error.message;
          //Mostra a mensagem de erro
          this.errorMsg = true
          console.log('Erro no login do Firebase')
           console.log(error)
          // console.log(errorMessage)
        });

      }
    },
    irRegistro() {      
        this.$router.push({ path: '/criarconta'})
      }
    },
    //pegar os dois campos
    //verificar se os 2 campos não são nulos
    //se for nulo exibir mensagem de erro
    //se não for nulo enviar para o servidor
  
};
</script>

<style>
  .align-center {
    display: flex;
    justify-content: center;
  }
  .error-message {
    color: red;
  }
</style>