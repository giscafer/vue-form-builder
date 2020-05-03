<template>
  <vue-run-sfc title="实时预览" :open="false" :code="code"></vue-run-sfc>
</template>

<script>
import genFormCode from "../generator/generateFormCode";
export default {
  props: ["data", "remote", "value", "insite"],
  data() {
    return {
      code: `<template>
<div>
  <h1>{{ title }}</h1>
  <div><el-button type="primary" @click="handleClick">点一下, 玩一年</el-button></div>
</div>
</template>
<script>
export default {
  data() {
    return {
      title: "宝刀屠龙"
    }
  },
  methods: {
    handleClick() {
      this.$message.success('装备不花一分钱')
    }
  }
};
<\/script>
<style lang="scss">
  body {
    #box {
      color: #409EFF;
    }
  }
</style>`
    };
  },
  created() {
    const code = genFormCode(this.data, this.value);
    this.code = encodeURIComponent(code);
  }
};
</script>
