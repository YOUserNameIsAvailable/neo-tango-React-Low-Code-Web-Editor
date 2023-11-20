import { IPublicModelPluginContext, IPublicTypeAssetsJson } from '@alilc/lowcode-types';
import { injectAssets } from '@alilc/lowcode-plugin-inject';
import jsonAssets from '../../services/assets.json';
import { getDefaultProjectSchema } from 'src/services/cacheService';

const EditorInitPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { material, project, config, editorWindow } = ctx;
      const scenarioName = config.get('scenarioName');

      const assets = await injectAssets(jsonAssets);
      await (material.setAssets(assets) as unknown as Promise<void>);

      console.log('intialized editor');

      // Load Schema
      const schema = await getDefaultProjectSchema(scenarioName, editorWindow.resource?.options.id);
      project.importSchema(schema as any);
    },
  };
};

EditorInitPlugin.pluginName = 'EditorInitPlugin';
EditorInitPlugin.meta = {};

export default EditorInitPlugin;
