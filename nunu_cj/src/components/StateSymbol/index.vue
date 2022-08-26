<!--
 * @ Description: 公共状态组件
 -->

<template>
  <span>
    <span class="state-symbol" :class="[state, { gray: gray }]"></span>
    <span v-if="text" :class="state + '-text'">{{ text }}</span>
  </span>
</template>

<script>
export default {
  name: 'StateSymbol',
  props: {
    state: {
      type: [String, Array],
      default: 'on',
    },
    text: {
      type: String,
      default: () => {},
    },
    gray: {
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.state-symbol {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: sub;
  border-radius: 50%;
}

.state-symbol::before {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 50%;
  height: 50%;
  margin-top: -25%;
  margin-left: -25%;
  border-radius: 50%;
  content: ' ';
}

.on {
  background-color: $light-success;
}

.on::before {
  background-color: $success;
}

.on-text {
  color: $success;
}

.develop {
  background-color: $info;
}

.develop::before {
  background-color: $primary;
}

.develop-text {
  color: $info;
}

.pause {
  background-color: $warning;
}

.pause::before {
  top: 25%;
  left: 25%;
  width: 3px;
  height: 50%;
  margin: 0;
  background-color: #fff !important;
  border-radius: 0;
}

.pause::after {
  position: absolute;
  top: 25%;
  left: 55%;
  display: block;
  width: 3px;
  height: 50%;
  margin: 0;
  background-color: #fff;
  border-radius: 0;
  content: ' ';
}

.pause-text {
  color: $warning;
}

.off {
  background-color: $host-light-off;
}

.off::before {
  background-color: $host-off;
}

.off-text {
  color: $host-off;
}

.error {
  background-color: $light-error;
}

.error::before {
  background-color: $error;
}

.error-text {
  color: $error;
}

.fault {
  background-color: $host-light-fault;
}

.fault::before {
  background-color: $host-fault;
}

.fault-text {
  color: $host-fault;
}

.ping-fault {
  background-color: $light-error;
}

.ping-fault::before {
  background-color: $host-ping-fault;
}

.ping-fault-text {
  color: $host-ping-fault;
}

.snmp-fault {
  background-color: $light-error;
}

.snmp-fault::before {
  background-color: $host-snmp-fault;
}

.snmp-fault-text {
  color: $host-snmp-fault;
}

.monit-fault {
  background-color: $light-error;
}

.monit-fault::before {
  background-color: $host-monit-fault;
}

.monit-fault-text {
  color: $host-monit-fault;
}

.no-monit {
  background-color: $host-light-no-monit;
}

.no-monit::before {
  background-color: $host-no-monit;
}

.no-monit-text {
  color: $host-no-monit;
}

.resource-fault {
  background-color: $light-error;
}

.resource-fault::before {
  background-color: $host-resource-fault;
}

.resource-fault-text {
  color: $host-resource-fault;
}

.gray {
  background-color: $host-light-off;
}

.gray::before {
  background-color: $host-off;
}

.warning {
  background-color: $yellow;
}

.warning::before {
  background-color: $warning;
}

.warning-text {
  color: $warning;
}
</style>
