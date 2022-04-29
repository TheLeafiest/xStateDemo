import { reactive } from "vue";
import { createMachine, assign } from "xstate";

export default createMachine(
  {
    initial: "idle",
    context: {
      result: undefined,
      fields: reactive({
        firstName: undefined,
        lastName: undefined,
      }),
    },
    states: {
      idle: {
        on: {
          SUBMIT: {
            target: "submitting",
          },
          RESET: {
            actions: ["resetResult", "resetForm"],
          },
        },
      },
      submitting: {
        entry: ["submit", "log"],
        after: {
          REFRESH_DELAY: "idle",
        },
      },
    },
  },
  {
    actions: {
      log: (_, event) => {
        // eslint-disable-next-line no-console
        console.log(event);
      },
      submit: assign({
        result: (context) =>
          `${context.fields.firstName} ${context.fields.lastName}`,
      }),
      resetResult: assign({
        result: (context) => undefined,
      }),
      resetForm: (context) => {
        Object.assign(context.fields, {
          firstName: undefined,
          lastName: undefined,
        });
      },
    },
    delays: {
      REFRESH_DELAY: 2000,
    },
  }
);
