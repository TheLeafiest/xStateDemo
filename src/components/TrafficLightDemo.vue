<template>
  <div class="topbar">
    <div v-if="state.matches('poweron')">
      <span class="material-icons" title="power on"> power </span>
    </div>
    <div v-else>
      <span class="material-icons" title="power off"> power_off </span>
    </div>

    <div v-if="state.context.batteryLevel === 10">
      <span class="material-icons" title="battery full"> battery_full </span>
    </div>
    <div
      v-else-if="state.context.batteryLevel < 10 && state.matches('poweron')"
    >
      <span class="material-icons" title="battery charging">
        battery_charging_full
      </span>
    </div>
    <div v-else>
      <span
        class="material-icons"
        :class="state.context.batteryLevel === 0 ? 'batteryDrained' : ''"
        :title="
          state.context.batteryLevel === 0
            ? 'battery drained'
            : 'battery draining'
        "
      >
        battery_alert
      </span>
    </div>

    <div class="progress" style="margin: 0 5px; flex: 1; max-width: 100px">
      <div
        class="progress-bar"
        :class="
          state.context.batteryLevel <= 2
            ? 'progress-bar-danger'
            : 'progress-bar-success'
        "
        role="progressbar"
        :aria-valuenow="state.context.batteryLevel"
        aria-valuemin="0"
        aria-valuemax="10"
        :style="{ width: `${state.context.batteryLevel * 10}%` }"
      ></div>
    </div>

    <DisplayState :state="state.value" />
  </div>

  <div class="grid">
    <div class="container1">
      <div
        :class="{
          circle: true,
          red: true,
          active:
            state.matches('poweron.red') ||
            state.matches('poweroff.batteryon.red'),
        }"
      ></div>
      <div
        :class="{
          circle: true,
          yellow: true,
          active: state.matches('poweron.yellow'),
        }"
      ></div>
      <div
        :class="{
          circle: true,
          green: true,
          active: state.matches('poweron.green'),
        }"
      ></div>
    </div>

    <div class="container2">
      <div
        :class="{
          circle2: true,
          walk: true,
          active: state.matches('poweron.green.walk'),
        }"
      >
        <span class="material-icons" title="walk"> directions_walk </span>
      </div>
      <div
        :class="{
          circle2: true,
          wait: state.matches('poweron.green.wait'),
          active:
            state.matches('poweron.red') || state.matches('poweron.yellow'),
        }"
      >
        <span class="material-icons" title="wait"> back_hand </span>
      </div>
    </div>
  </div>

  <div class="actions">
    <button
      class="btn btn-primary"
      v-if="state.matches('poweron')"
      @click="send({ type: 'POWER_LOST' })"
    >
      CUT POWER
    </button>
    <button
      class="btn btn-primary"
      v-if="state.matches('poweroff')"
      @click="send({ type: 'POWER_RESTORED' })"
    >
      RESTORE POWER
    </button>
    <button
      class="btn btn-primary"
      v-if="state.matches('poweroff')"
      @click="send({ type: 'BATTERY_REFILL' })"
    >
      REFILL BATTERY
    </button>
  </div>
</template>

<script>
import { useMachine } from "@xstate/vue";
import trafficLightDemoMachine from "@/machines/trafficLightDemoMachine";
import DisplayState from "@/components/DisplayState.vue";

export default {
  name: "TrafficLightDemo",
  components: {
    DisplayState,
  },
  setup() {
    const { state, send } = useMachine(trafficLightDemoMachine);

    return {
      state,
      send,
    };
  },
};
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
}
.actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
@keyframes blinking {
  0% {
    color: #ffffff;
  }
  49% {
    color: #ffffff;
  }
  50% {
    color: #c0392b;
  }
  100% {
    color: #c0392b;
  }
}
.batteryDrained {
  animation: blinking 1s infinite;
}
.btn {
  margin-right: 5px;
}
/* special thanks to https://dotnettec.com/traffic-light-simulator-using-only-html-and-css/ */
.grid {
  display: flex;
  justify-content: center;
}
.container1 {
  background-color: #2c3e50;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 15px 0;
  height: 200px;
  width: 70px;
  margin: 50px 10px;
}
.circle {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 100%;
  position: relative;
  height: 40px;
  width: 40px;
}
.circle.red.active {
  background-color: #c0392b;
  box-shadow: 0 0 20px 5px #c0392b;
}
.circle.yellow.active {
  background-color: #f1c40f;
  box-shadow: 0 0 20px 5px #f1c40f;
}
.circle.green.active {
  background-color: #2ecc71;
  box-shadow: 0 0 20px 5px #2ecc71;
}

.container2 {
  background-color: #2c3e50;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 15px 0;
  height: 150px;
  width: 70px;
  margin: 50px 10px;
}
.circle2 {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 100%;
  position: relative;
  height: 40px;
  width: 40px;
  display: grid;
  place-items: center;
}
.circle2.walk.active span {
  color: white;
}
.circle2.active span {
  color: orange;
}
@keyframes wait {
  0% {
    color: inherit;
  }
  49% {
    color: inherit;
  }
  50% {
    color: orange;
  }
  100% {
    color: orange;
  }
}
.circle2.wait span {
  animation: wait 1s infinite;
}
</style>
