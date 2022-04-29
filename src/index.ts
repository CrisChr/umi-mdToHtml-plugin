import {IApi} from '@umijs/types';
import {Mustache} from '@umijs/utils';
import {join, resolve} from 'path';
import {readFileSync} from 'fs';

const DIR_NAME = 'plugin-md-to-html'

export default (api:IApi) => {
  api.describe({
    key: 'mdToHtml',
    config: {
      schema(joi) {
        return joi.object({
          mdPath: joi.string(),
        });
      },
    },
  });

  api.onGenerateFiles({
    fn: () => {
      const {mdToHtml} = api.userConfig;
      const template = readFileSync(join(__dirname, '../template/compiler.ts'), 'utf8');
      api.writeTmpFile({
        path: `${DIR_NAME}/index.ts`,
        content: Mustache.render(template.toString(), {
          mdContent: readFileSync(resolve(__dirname, mdToHtml.mdPath), 'utf8').toString(),
        }),
      });
    }
  });

  api.addUmiExports(() => [
    {
      specifiers: ['mdToHtml'],
      exportAll: true,
      source: join(api.paths.absTmpPath!, `${DIR_NAME}/index.ts`),
    },
  ]);

}