/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2020-05-03 00:41:10
 * @description: 动态生成表单源码
 */

import { DATA_MODEL } from './constant';
import { genFormItemTemp } from './generateFormItemCode';

let models;
let rules;
let dataModel;

export default function genFormCode(data, value) {
  models = {};
  rules = {};
  dataModel = {};
  const res = generateModel(data.list, value, models, rules);
  Object.assign(models, res.models);
  Object.assign(rules, res.rules);
  Object.assign(dataModel, res.dataModel);

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
    if (widget.type === 'grid') {
      const item = widget;
      templateCode += `<el-row
      key="${item.key}"
      type="flex"
      :gutter="${item.options.gutter ? item.options.gutter : 0}"
      justify="${item.options.justify}"
      align="${item.options.align}"
    >`;
      item.columns.forEach((col, colIndex) => {
        templateCode += ` <el-col key="${colIndex}" :span="${col.span}">
        ${col.list.reduce(
          (template, citem) => template + genFormItemTemp(citem),
          ''
        )}
    </el-col>`;
      });

      templateCode += `</el-row>`;
    } else {
      templateCode += genFormItemTemp(widget);
    }
  }

  templateCode += `</el-form>
    </div>
  </template>`;

  const scriptCode = `<script>
    export default {
      name:'form-builder',
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
