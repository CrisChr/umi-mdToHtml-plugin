import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  plugins: [require.resolve('../lib/index')],
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  mdToHtml: {
    mdPath: resolve(__dirname, './README.md'),
  }
});
