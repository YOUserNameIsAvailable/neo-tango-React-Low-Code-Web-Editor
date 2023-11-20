import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button } from '@alifd/next';
import { resetSchema } from 'src/services/cacheService';

//save function example
const ResetPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, hotkey, config, workspace } = ctx;
      const scenarioName = config.get('scenarioName');

      skeleton.add({
        name: 'resetSchema',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: <Button onClick={async () => await resetSchema(scenarioName)}>Reset Page</Button>,
      });
    },
  };
};
ResetPlugin.pluginName = 'ResetPlugin';
ResetPlugin.meta = {
  dependencies: [],
};
export default ResetPlugin;
