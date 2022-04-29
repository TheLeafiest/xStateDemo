import { reactive } from "vue";
import { createMachine, assign } from "xstate";

export default createMachine(
  {
    id: "authMachine",
    initial: "anonymous",
    context: {
      loginForm: {
        fields: reactive({
          email: undefined,
          password: undefined,
        }),
        // rules: {
        //   email: [(v: string) => !v || "email field can not be empty"],
        //   password: [(v: string) => !v ?? "password can not be empty"],
        // },
      },
      loginAttempts: 0,
      error: undefined,
    },
    on: {
      AUTHENTICATE: [
        {
          target: "#anonymous.userLocked",
          cond: "maxLoginAttempts",
        },
        {
          target: "#authenticating",
        },
      ],
    },
    states: {
      anonymous: {
        id: "anonymous",
        initial: "checking",
        states: {
          checking: {
            always: [
              {
                target: "idle",
              },
            ],
          },
          idle: {},
          userLocked: {},
        },
      },
      authenticating: {
        id: "authenticating",
        initial: "exchanging",
        states: {
          exchanging: {
            always: [
              {
                target: "tokenAcquired",
                cond: "validCredentials",
              },
              {
                target: "#anonymous.idle",
                actions: ["incrementLoginAttempts", "log"],
              },
            ],
          },
          tokenAcquired: {
            entry: ["log", "resetLoginAttempts"],
            after: {
              REFRESH_DELAY: "#authenticated",
            },
          },
        },
      },
      authenticated: {
        id: "authenticated",
        initial: "idle",
        on: {
          LOGOUT: {
            target: "#anonymous.idle",
          },
        },
        states: {
          idle: {
            // after: {
            //   REFRESH_DELAY: "refreshing",
            // },
          },
        },
      },
    },
  },
  {
    actions: {
      log: (context, event) => {
        console.log(event);
        console.log(context);
      },
      incrementLoginAttempts: assign({
        loginAttempts: (context) => context.loginAttempts + 1,
      }),
      resetLoginAttempts: assign({
        loginAttempts: (context) => 0,
      }),
    },
    delays: {
      REFRESH_DELAY: 2000,
    },
    guards: {
      maxLoginAttempts: (context) => context.loginAttempts >= 5,
      validCredentials: (context) =>
        context.loginForm.fields.email === "test@test.com" &&
        context.loginForm.fields.password === "test",
    },
  }
);
