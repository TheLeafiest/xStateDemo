<template>
  <div class="auth-demo">
    <form
      v-if="state.matches('anonymous') || state.matches('authenticating')"
      @submit.prevent="send('AUTHENTICATE')"
      @keyup.enter.prevent="send('AUTHENTICATE')"
    >
      <div class="form-group">
        <label for="exampleInputEmail">Email</label>
        <input
          v-model="state.context.loginForm.fields.email"
          type="email"
          class="form-control"
          id="exampleInputEmail"
          placeholder="Email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword">Password</label>
        <input
          v-model="state.context.loginForm.fields.password"
          type="password"
          class="form-control"
          id="exampleInputPassword"
          placeholder="Password"
        />
      </div>
      <button @click.prevent="send('AUTHENTICATE')" class="btn btn-primary">Login</button>
    </form>
    <button v-else @click.prevent="send('LOGOUT')" class="btn btn-primary">Logout</button>

    <DisplayState :state="state.value" />
  </div>
</template>

<script>
import { useMachine } from "@xstate/vue";
import authMachine from "@/machines/authMachine";
import DisplayState from "@/components/DisplayState.vue";

export default {
  name: "AuthDemo",
  components: {
    DisplayState,
  },
  setup() {
    const { state, send } = useMachine(authMachine);

    return {
      state,
      send,
    };
  },
};
</script>

<style scoped>
.auth-demo {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
