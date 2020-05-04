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
    arrowControl,
    clearable,
    dataType,
    disabled,
    editable,
    format,
    inline,
    isRange,
    options,
    placeholder,
    remote,
    remoteOptions,
    readonly,
    step,
    showLabel,
    type,
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
  } else if (widget.type === 'number') {
    widgetTemp += `<el-input-number
          v-model="${model}"
          placeholder="${placeholder || ''}"
          :step="${step}"
          :style="{width:'${width}'}"
          :disabled="${disabled}"
          ></el-input-number>`;
  } else if (widget.type === 'radio') {
    const optionArr = remote ? remoteOptions : options;
    const optionFunc = () => {
      let optStr = '';
      for (const item of optionArr) {
        optStr += `
        <el-radio
            :style="{display:'${inline ? 'inline-block' : 'block'}' }"
            label="${item.value}"
            key="${item.value}">
            ${remote ? item.label : showLabel ? item.label : item.value}
          </el-radio>`;
      }
      return optStr;
    };
    widgetTemp += `<el-radio-group
          v-model="${model}"
          :style="{width:'${width}'}"
          :disabled="${disabled}" >
              ${optionFunc()}
      </el-radio-group>`;
  } else if (widget.type === 'checkbox') {
    const optionArr = remote ? remoteOptions : options;
    const optionFunc = () => {
      let optStr = '';
      for (const item of optionArr) {
        optStr += `
        <el-checkbox
            :style="{display:'${inline ? 'inline-block' : 'block'}' }"
            label="${item.value}"
            key="${item.value}">
            ${remote ? item.label : showLabel ? item.label : item.value}
          </el-checkbox>
          `;
      }
      return optStr;
    };
    widgetTemp += `<el-checkbox-group
          v-model="${model}"
          :style="{width:'${width}'}"
          :disabled="${disabled}" >
              ${optionFunc()}
      </el-checkbox-group>`;
  } else if (widget.type === 'time') {
    widgetTemp += `<el-time-picker
          v-model="${model}"
          :is-range="${isRange}"
          placeholder="${placeholder || ''}"
          start-placeholder="${widget.options.startPlaceholder || '开始时间'}"
          end-placeholder="${widget.options.endPlaceholder || '结束时间'}"
          :readonly="${readonly}"
          :disabled="${disabled}"
          :editable="${editable}"
          :clearable="${clearable}"
          :arrowControl="${arrowControl}"
          value-format="${format}"
          :style="{width:'${width}'}"
          ></el-time-picker>`;
  } else if (widget.type === 'date') {
    widgetTemp += `<el-date-picker
          v-model="${model}"
          type="${type}"
          :is-range="${isRange}"
          placeholder="${placeholder || ''}"
          start-placeholder="${widget.options.startPlaceholder || '开始'}"
          end-placeholder="${widget.options.endPlaceholder || '结束'}"
          :readonly="${readonly}"
          :disabled="${disabled}"
          :editable="${editable}"
          :clearable="${clearable}"
          :arrowControl="${arrowControl}"
          value-format="${format}"
          :style="{width:'${width}'}"
          ></el-date-picker>`;
  } else if (widget.type === 'rate') {
    widgetTemp += `<el-rate
          :rows="5"
          v-model="${model}"
          placeholder="${placeholder || ''}"
          :max="${widget.options.max}"
          :disabled="${disabled}"
          :allow-half="${widget.options.allowHalf}"
          ></el-rate>`;
  } else if (widget.type === 'color') {
    widgetTemp += `<el-color-picker
          v-model="${model}"
          :disabled="${disabled}"
          :show-alpha="${widget.options.showAlpha}"
          ></el-color-picker>`;
  } else if (widget.type === 'select') {
    const optionArr = remote ? remoteOptions : options;
    const optionFunc = () => {
      let optStr = '';
      for (const item of optionArr) {
        optStr += `
        <el-option
            value="${item.value}"
            key="${item.value}"
            label="${showLabel || remote ? item.label : item.value}">
          </el-option>
          `;
      }
      return optStr;
    };
    widgetTemp += `<el-select
          v-model="${model}"
          placeholder="${placeholder || ''}"
          :style="{width:'${width}'}"
          :multiple="${widget.options.multiple}"
          :filterable="${widget.options.filterable}"
          :clearable="${clearable}"
          :disabled="${disabled}" >
              ${optionFunc()}
      </el-select>`;
  } else if (widget.type === 'switch') {
    widgetTemp += `<el-switch
          v-model="${model}"
          :disabled="${disabled}"
          ></el-switch>`;
  } else if (widget.type === 'slider') {
    widgetTemp += `<el-slider
        v-model="${model}"
        :disabled="${disabled}"
        :min="${widget.options.min}"
        :max="${widget.options.max}"
        :step="${widget.options.step}"
        :show-input="${widget.options.showInput}"
        :range="${widget.options.range}"
        :style="{width:'${width}'}"></el-slider>`;
  }
  //   高级字段
  else if (widget.type === 'imgupload') {
    // TODO: 自定义组件支持渲染
    widgetTemp += `<fm-upload
        v-model="${model}"
        :disabled="${disabled}"
        :style="{width:'${width}'}"
        width="${widget.options.size.width}"
        height="${widget.options.size.height}"
        token="${widget.options.token}"
        domain="${widget.options.domain}"
        :multiple="${widget.options.multiple}"
        :length="${widget.options.length}"
        :is-qiniu="${widget.options.isQiniu}"
        :is-delete="${widget.options.isDelete}"
        :min="${widget.options.min}"
        :is-edit="${widget.options.isEdit}"
        action="${widget.options.action}"
      ></fm-upload>`;
  } else if (widget.type === 'cascader') {
    // TODO: 自定义组件渲染
    widgetTemp += `<vue-editor
        v-model="${model}"
        :style="{width:'${width}'}""></vue-editor>`;
  } else if (widget.type === 'cascader') {
    // TODO: 远端数据
    widgetTemp += ` <el-cascader
    v-model="${model}"
    :disabled="${disabled}"
    :clearable="${clearable}"
    placeholder="${placeholder || ''}"
    :style="{width:'${width}'}"
    :options="${JSON.stringify(remoteOptions)}"
  ></el-cascader>`;
  } else if (widget.type === 'text') {
    widgetTemp += `<span>{{${model}}}</span>`;
  } else if (widget.type === 'table') {
    // TODO: 远端数据
    const columnFunc = () => {
      let columnStr = '';
      for (const item of widget.options.columns) {
        columnStr += `
        <el-table-column
            prop="${item.field}"
            label="${item.label}"
            ${item.width ? ':style="{width:\'' + item.width + '\'}"' : ''}>
          </el-table-column>
          `;
      }
      return columnStr;
    };
    widgetTemp += ` <el-table
    :data="${model}"
    ${widget.options.height && 'height="' + widget.options.height + '"'}
    :border="${widget.options.border}"
    :stripe="${widget.options.stripe}"
    ${
      widget.options.width
        ? ':style="{width:\'' + widget.options.width + '\'}"'
        : ''
    }>${columnFunc()}</el-table>`;
  }
  return widgetTemp;
}
