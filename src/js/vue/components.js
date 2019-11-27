import Vue from 'vue';
import SubMenu from 'components/common/sub-menu';
import SearchFilter from 'components/common/search-filter';
import AItem from 'components/common-item/a-item';
import BItem from 'components/common-item/b-item';

Vue.component('SubMenu', SubMenu);
Vue.component('AItem', AItem);
Vue.component('BItem', BItem);
Vue.component('SearchFilter', SearchFilter);
Vue.component('Qiniu', () => import('components/common/qiniu'));
Vue.component('Chart', () => import('components/common/chart'));
Vue.component('CodeEditor', () => import('components/common/code-editor'));
Vue.component('RichTextEditor', () => import('components/common/richtext-editor'));
Vue.component('MarkdownEditor', () => import('components/common/markdown-editor'));
Vue.component('BaiduMap', () => import('components/common/baidu-map'));
