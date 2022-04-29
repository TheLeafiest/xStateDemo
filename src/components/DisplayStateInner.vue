<template>
  <div v-if="typeof state !== 'object'">
    <span>{{ state }}</span>
  </div>
  <div v-else v-for="(value, name) in state" :key="name">
    <div v-if="typeof value !== 'object'">
      <span>
        <span v-if="indent" class="small material-icons" title="sub state">
          subdirectory_arrow_right
        </span>
        {{ name }}: {{ value }}
      </span>
    </div>
    <div v-else>
      <span>{{ name }}:</span>
      <DisplayStateInner :indent="true" :state="value" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayStateInner",
  props: ["state", "indent"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
