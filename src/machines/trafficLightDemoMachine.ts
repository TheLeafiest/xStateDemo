import { createMachine, assign } from "xstate";

export default createMachine(
  {
    initial: "poweron",
    context: {
      batteryLevel: 10,
    },
    states: {
      poweron: {
        initial: "red",
        on: {
          POWER_LOST: "poweroff",
          CHARGE_BATTERY: [
            {
              cond: "batteryFull",
            },
            {
              actions: "chargeBattery",
            },
          ],
        },
        invoke: {
          id: "chargeBattery",
          src: "chargeBattery",
        },
        states: {
          red: {
            id: "red",
            after: {
              DELAY_TRANSITION: "#green",
            },
          },
          yellow: {
            id: "yellow",
            after: {
              DELAY_TRANSITION: "#red",
            },
          },
          green: {
            id: "green",
            initial: "walk",
            states: {
              walk: {
                after: {
                  DELAY_PEDESTRIAN: "wait",
                },
              },
              wait: {
                after: {
                  DELAY_PEDESTRIAN: "#yellow",
                },
              },
            },
          },
        },
      },
      poweroff: {
        initial: "batteryon",
        on: {
          POWER_RESTORED: "poweron",
          BATTERY_REFILL: [
            {
              target: "#batteryon",
              cond: "batteryEmpty",
              actions: "batteryRefill",
            },
            {
              actions: "batteryRefill",
            },
          ],
        },
        states: {
          batteryon: {
            id: "batteryon",
            initial: "red",
            on: {
              DRAIN_BATTERY: [
                {
                  target: "batteryoff",
                  cond: "batteryEmpty",
                },
                {
                  actions: "drainBattery",
                },
              ],
            },
            invoke: {
              id: "drainBattery",
              src: "drainBattery",
            },
            states: {
              red: {
                after: {
                  DELAY_FLASHING: "off",
                },
              },
              off: {
                after: {
                  DELAY_FLASHING: "red",
                },
              },
            },
          },
          batteryoff: {},
        },
      },
    },
  },
  {
    delays: {
      DELAY_TRANSITION: 5000,
      DELAY_PEDESTRIAN: 2500,
      DELAY_FLASHING: 1000,
    },
    services: {
      drainBattery: () => (callback) => {
        // This will send the 'INC' event to the parent every second
        const id = setInterval(() => callback("DRAIN_BATTERY"), 1000);

        // Perform cleanup
        return () => clearInterval(id);
      },
      chargeBattery: () => (callback) => {
        // This will send the 'INC' event to the parent every second
        const id = setInterval(() => callback("CHARGE_BATTERY"), 1000);

        // Perform cleanup
        return () => clearInterval(id);
      },
    },
    actions: {
      drainBattery: assign({
        batteryLevel: (context) => context.batteryLevel - 1,
      }),
      chargeBattery: assign({
        batteryLevel: (context) => context.batteryLevel + 1,
      }),
      batteryRefill: assign({
        batteryLevel: 10,
      }),
    },
    guards: {
      batteryEmpty: (context) => {
        return context.batteryLevel === 0;
      },
      batteryFull: (context) => {
        return context.batteryLevel === 10;
      },
    },
  }
);
