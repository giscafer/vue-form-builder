<template>
  <div>
    <el-form
      ref="generateForm"
      label-suffix=":"
      size="small"
      :model="models"
      :rules="rules"
      label-position="right"
      label-width="100px "
    >
      <el-form-item label="单行文本" prop="input_1588443578000_36965">
        <el-input
          type="text"
          v-model="dataModel.input_1588443578000_36965"
          placeholder="请输入"
          :style="{width:'100%'}"
          :disabled="false"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      models: { input_1588443578000_36965: "" },
      rules: {
        input_1588443578000_36965: [
          { type: "string", message: "单行文本格式不正确" }
        ]
      },
      dataModel: { input_1588443578000_36965: "111" }
    };
  },
  created() {
    console.log("***SUCCESS***");
  },
  methods: {}
};
</script>