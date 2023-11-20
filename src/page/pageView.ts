import UndoRedoPlugin from '@alilc/lowcode-plugin-undo-redo';
import DataSourcePanePlugin from '@alilc/lowcode-plugin-datasource-pane';
import CodeEditorPlugin from '@alilc/lowcode-plugin-code-editor';
import ManualPlugin from '@alilc/lowcode-plugin-manual';

import ComponentPanelPlugin from '@alilc/lowcode-plugin-components-pane';
import DefaultSettersRegistryPlugin from '../plugins/plugin-default-setters-registry';
import LoadIncrementalAssetsWidgetPlugin from '../plugins/plugin-load-incremental-assets-widget';

import CodeGenPlugin from '@alilc/lowcode-plugin-code-generator'; 

import CustomSetterSamplePlugin from '../plugins/plugin-custom-setter-sample';
import SetRefPropPlugin from '@alilc/lowcode-plugin-set-ref-prop';
import SimulatorResizePlugin from '@alilc/lowcode-plugin-simulator-select';

import lowcodePlugin from '../plugins/plugin-lowcode-component';
import { IPublicModelPluginContext, IPublicTypePlugin } from '@alilc/lowcode-types';
import EditorInitPlugin from '../plugins/plugin-editor-init';

import ResetPlugin from '../plugins/plugin-reset';
import { saveSchema } from 'src/services/cacheService';

export const pageView = (
  ctx: IPublicModelPluginContext,
  options: {
    slug: string;
    title: string;
    id: string;
  },
) => {
  const { plugins, config } = ctx;

  return {
    async init() {
      await plugins.register(EditorInitPlugin, {
        scenarioName: 'general',
        displayName: '综合场景',
        info: {
          urls: [
            {
              key: '设计器',
              value: 'https://github.com/alibaba/lowcode-demo/tree/main/demo-general',
            },
            {
              key: 'fusion-ui 物料',
              value: 'https://github.com/alibaba/lowcode-materials/tree/main/packages/fusion-ui',
            },
            {
              key: 'fusion 物料',
              value: 'https://github.com/alibaba/lowcode-materials/tree/main/packages/fusion-lowcode-materials',
            }
          ],
        },
      });

      //Set the built-in setter and event binding, plug-in binding panel
      await plugins.register(DefaultSettersRegistryPlugin);

      await plugins.register(ComponentPanelPlugin);

      await plugins.register(ManualPlugin as any);
      
      await plugins.register(UndoRedoPlugin as any);

      await plugins.register(SetRefPropPlugin as any);

      // await plugins.register(LoadIncrementalAssetsWidgetPlugin);

      await plugins.register(SimulatorResizePlugin as any);

      //Plug-in parameter declaration & transfer, reference: https://lowcode-engine.cn/site/docs/api/plugins#%E8%AE%BE%E7%BD%AE%E6%8F%92%E4%BB %B6%E5%8F%82%E6%95%B0%E7%89%88%E6%9C%AC%E7%A4%BA%E4%BE%8B
      await plugins.register(DataSourcePanePlugin as any, {
        importPlugins: [],
        dataSourceTypes: [
          {
            type: 'fetch',
          },
          {
            type: 'jsonp',
          },
        ],
      });

      await plugins.register(ResetPlugin);

      await plugins.register(CodeEditorPlugin as any);
      
      await plugins.register(CodeGenPlugin as any);

      await plugins.register(CustomSetterSamplePlugin);

      await plugins.register(lowcodePlugin);
    },
    async save() {
      const scenarioName = config.get('scenarioName');
      await saveSchema(scenarioName, options.id, ctx);
    },
  };
};

pageView.viewName = 'page';
