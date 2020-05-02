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
  cssLabs: 'https://unpkg.com/normalize.css@8.0.1/normalize.css',
  row: false,
  reverse: true,
  isHideHeader: false,
});

const messages = {
  'en-US': {
    header: {
      title: 'FormMaking',
      document: 'Docs',
      pricing: 'Pricing',
      advanced: 'Advanced',
    },
  },
  'zh-CN': {
    header: {
      title: '表单设计器',
      document: '使用文档',
      pricing: '商业授权',
      advanced: '高级版本',
    },
  },
};

Vue.locale('en-US', { ...enLocale, ...messages['en-US'] });
Vue.locale('zh-CN', { ...zhLocale, ...messages['zh-CN'] });
Vue.config.lang = 'zh-CN';

Vue.use(ElementUI, { size: 'small' });

// import 'form-builder/dist/FormMaking.css'
// import FormMaking from 'form-builder'
import FormMaking from './index';
Vue.use(FormMaking);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
