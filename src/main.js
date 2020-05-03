import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import VueEditor from 'vue2-editor';
import VueRunSfc from 'vue-run-sfc';

import 'element-ui/lib/theme-chalk/index.css';

import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

Vue.use(VueI18n);
Vue.use(VueEditor);

Vue.use(VueRunSfc, {
  cssLabs: [
    'https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css',
    'https://cdn.jsdelivr.net/npm/element-ui@2.9.1/lib/theme-chalk/index.css',
  ],
  jsLabs: ['https://cdn.jsdelivr.net/npm/element-ui@2.9.1/lib/index.js'],
  row: true,
  reverse: true,
  height: '400px',
  open: true,
  isHideHeader: false,
});

import './components';

const messages = {
  'en-US': {
    header: {
      title: 'FormBuilder',
      document: 'Docs',
    },
  },
  'zh-CN': {
    header: {
      title: '表单源码生成平台',
      document: '使用文档',
    },
  },
};

Vue.locale('en-US', { ...enLocale, ...messages['en-US'] });
Vue.locale('zh-CN', { ...zhLocale, ...messages['zh-CN'] });
Vue.config.lang = 'zh-CN';

Vue.use(ElementUI, { size: 'small' });

import FormBuilder from './index';
Vue.use(FormBuilder);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
