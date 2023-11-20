import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import lowcodeSchema from './lowcode-schema.json';

const lowcodePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { material } = ctx;
      await material.loadIncrementalAssets({
        version: '',
        components: [
          {
            devMode: 'lowCode',
            componentName: 'LowcodeDemo',
            title: 'Low-code component example',
            group: 'Low-code components',
            schema: lowcodeSchema as any,
            snippets: [
              {
                schema: {
                  componentName: 'LowcodeDemo',
                },
              },
            ],
          },
        ],
      });
    },
  };
};
lowcodePlugin.pluginName = 'lowcodePlugin';
lowcodePlugin.meta = {};
export default lowcodePlugin;
