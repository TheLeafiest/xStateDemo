<template>
  <div class="form-demo">
    <form v-if="!state.context.result">
      <div class="form-group">
        <label for="exampleInputFirstName">First Name</label>
        <input
          v-model="state.context.fields.firstName"
          class="form-control"
          id="exampleInputFirstName"
          placeholder="John"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputLastName">Last Name</label>
        <input
          v-model="state.context.fields.lastName"
          class="form-control"
          id="exampleInputLastName"
          placeholder="Smith"
        />
      </div>
      <button @click.prevent="send('SUBMIT')" class="btn btn-primary">
        Submit
      </button>
    </form>
    <div v-else>
      <p>Result: {{ state.context.result }}</p>
      <button
        :disabled="state.matches('submitting')"
        @click.prevent="send('RESET')"
        class="btn btn-primary"
      >
        Reset
      </button>
    </div>

    <DisplayState :state="state.value" />
  </div>
</template>

<script>
import { useMachine } from "@xstate/vue";
import formMachine from "@/machines/formMachine";
import DisplayState from "@/components/DisplayState.vue";

export default {
  name: "FormDemo",
  components: {
    DisplayState,
  },
  setup() {
    const { state, send } = useMachine(formMachine);

    return {
      state,
      send,
    };
  },
};
</script>

<style scoped>
.form-demo {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
