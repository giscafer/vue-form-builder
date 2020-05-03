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
      <el-form-item label="单选框组" prop="radio_27c2dce87">
        <el-radio-group v-model="dataModel.radio_27c2dce87" :style="{width:''}" :disabled="false">
          <el-radio :style="{display:'block' }" label="Option 1" key="Option 1">Option 1</el-radio>
          <el-radio :style="{display:'block' }" label="Option 2" key="Option 2">Option 2</el-radio>
          <el-radio :style="{display:'block' }" label="Option 3" key="Option 3">Option 3</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "form-builder",
  data() {
    return {
      models: { radio_27c2dce87: "" },
      rules: { radio_27c2dce87: [] },
      dataModel: { radio_27c2dce87: "" }
    };
  },
  created() {
    console.log("***SUCCESS***");
  },
  methods: {}
};
</script>
