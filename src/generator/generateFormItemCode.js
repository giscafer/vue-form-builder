import { DATA_MODEL } from './constant';

export function genFormItemTemp(widget) {
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
