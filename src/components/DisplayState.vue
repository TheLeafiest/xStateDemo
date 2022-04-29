<template>
  <div class="align-right">
    <h5 class="align-right__title">STATE</h5>

    <div class="align-right__content">
      <DisplayStateInner :state="state" />
    </div>
  </div>
</template>

<script>
import DisplayStateInner from "@/components/DisplayStateInner.vue";

export default {
  name: "DisplayState",
  components: {
    DisplayStateInner,
  },
  props: ["state"],
};
</script>

<style scoped>
.align-right {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  font-size: 1.5rem;
  border: 1px solid lightgrey;
  background-color: #fafafa;
  border-radius: 1rem;
  overflow: hidden;
}
.align-right__title {
  color: #ffffff;
  border-bottom: 1px solid lightgrey;
  text-align: center;
  font-weight: 400;
  background-color: #337ab7;
  padding: 1rem;
  margin: 0;
}
.align-right__content {
  padding: 1rem;
  min-width: 150px;
  min-height: 100px;
}
</style>
