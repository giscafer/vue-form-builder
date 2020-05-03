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
      <el-form-item label="单行文本" prop="input_1588479171000_92966">
        <el-input
          type="text"
          v-model="dataModel.input_1588479171000_92966"
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
  name: "form-builder",
  data() {
    return {
      models: { input_1588479171000_92966: "" },
      rules: {
        input_1588479171000_92966: [
          { type: "string", message: "单行文本格式不正确" }
        ]
      },
      dataModel: { input_1588479171000_92966: "" }
    };
  },
  created() {
    console.log("***SUCCESS***");
  },
  methods: {}
};
</script>