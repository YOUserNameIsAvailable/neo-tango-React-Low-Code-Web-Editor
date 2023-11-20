import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button } from '@alifd/next';

//save function example
const PreviewSamplePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, config, workspace } = ctx;

      const doPreview = async () => {
        const scenarioName = config.get('scenarioName');

        await Promise.all(workspace.windows.map((d) => d.save()));

        setTimeout(() => {
          const search = location.search
            ? `${location.search}&scenarioName=${scenarioName}`
            : `?scenarioName=${scenarioName}`;
          window.open(`./index.html${search}`);
        }, 500);
      };

      skeleton.add({
        name: 'previewSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button type="primary" onClick={() => doPreview()}>
            Preview
          </Button>
        ),
      });
    },
  };
};

PreviewSamplePlugin.pluginName = 'PreviewSamplePlugin';
PreviewSamplePlugin.meta = {
  dependencies: [],
};

export default PreviewSamplePlugin;
