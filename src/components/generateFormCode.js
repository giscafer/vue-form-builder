/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2020-05-03 00:41:10
 * @description: 动态生成表单源码
 */

const DATA_MODEL = 'dataModel';

export default function genFormCode(data, value, remote) {
  const { models, rules, dataModel } = generateModel(
    data.list,
    value,
    models,
    rules
  );

  let templateCode = `<template>
    <div>
      <el-form
        ref="generateForm"
        label-suffix=":"
        size="${data.config.size}"
        :model="models"
        :rules="rules"
        label-position="${data.config.labelPosition}"
        label-width="${data.config.labelWidth + 'px'} "
      >`;

  for (let widget of data.list) {
    templateCode += genFormItemTemp(widget);
  }

  templateCode += `</el-form>
    </div>
  </template>`;

  const scriptCode = `<script>
    export default {
        data() {
          return {
            models: ${JSON.stringify(models)},
            rules: ${JSON.stringify(rules)},
            ${DATA_MODEL}: ${JSON.stringify(dataModel)},
          };
        },
        created() {
            console.log("***SUCCESS***");
        },
        methods: {}
    }
    </script>`;
  const styleCode = '';
  const result = templateCode + '\r\n' + scriptCode + '\r\n' + styleCode;
  console.log(result);
  return result;
}

function generateModel(genList, value) {
  let models = {};
  let rules = {};
  let dataModel = {};
  for (let i = 0; i < genList.length; i++) {
    if (genList[i].type === 'grid') {
      genList[i].columns.forEach((item) => {
        generateModel(item.list);
      });
    } else {
      if (value && Object.keys(value).indexOf(genList[i].model) >= 0) {
        models[genList[i].model] = value[genList[i].model];
      } else {
        if (genList[i].type === 'blank') {
          $set(
            models,
            genList[i].model,
            genList[i].options.defaultType === 'String'
              ? ''
              : genList[i].options.defaultType === 'Object'
              ? {}
              : []
          );
        } else {
          models[genList[i].model] = genList[i].options.defaultValue;
        }
      }
      // 每个 widget 的 model
      dataModel[genList[i].model] = models[genList[i].model];

      if (rules[genList[i].model]) {
        rules[genList[i].model] = [
          ...rules[genList[i].model],
          ...genList[i].rules.map((item) => {
            if (item.pattern) {
              return { ...item, pattern: eval(item.pattern) };
            } else {
              return { ...item };
            }
          }),
        ];
      } else {
        rules[genList[i].model] = [
          ...genList[i].rules.map((item) => {
            if (item.pattern) {
              return { ...item, pattern: eval(item.pattern) };
            } else {
              return { ...item };
            }
          }),
        ];
      }
    }
  }
  return { models, rules, dataModel };
}

function genFormItemTemp(widget) {
  let template = `
      <el-form-item label="${widget.name}" prop="${widget.model}">
        ${genWidgetTemp(widget)}
      </el-form-item>
  `;
  return template;
}

function genWidgetTemp(widget) {
  let widgetTemp = '';
  let {
    dataType,
    disabled,
    inline,
    options,
    placeholder,
    remote,
    remoteOptions,
    showLabel,
    width,
  } = widget.options;
  const model = `${DATA_MODEL}.${widget.model}`;
  if (!placeholder) {
    placeholder = '请输入';
  }
  if (widget.type === 'input') {
    let type = 'text';
    if (
      dataType === 'number' ||
      dataType === 'integer' ||
      dataType === 'float'
    ) {
      type = 'number';
    }
    widgetTemp += `<el-input
        type="${type}"
        v-model${type === 'number' ? '.number' : ''}="${model}"
        placeholder="${placeholder}"
        :style="{width:'${width}'}"
        :disabled="${disabled}"
      ></el-input>`;
  } else if (widget.type === 'textarea') {
    widgetTemp += `<el-input
        type="textarea"
        :rows="5"
        v-model="${model}"
        placeholder="${placeholder || ''}"
        :style="{width:'${width}'}"
        :disabled="${disabled}"
        ></el-input>`;
  } else if (widget.type === 'radio') {
    widgetTemp += `<el-radio-group
        v-model="${model}"
        :style="{width:'${width}'}"
        :disabled="${disabled}" >
            <el-radio
            v-for="(item, index) in (${remote ? remoteOptions : options})"
            :style="{display:${inline ? 'inline-block' : 'block'} }"
            :label="item.value"
            :key="index">
        <template v-if="widget.options.remote">{{item.label}}</template>
        <template v-else>{{${showLabel} ? item.label : item.value}}</template>
        </el-radio>
    </el-radio-group>`;
  }
  return widgetTemp;
}
