import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import AliLowCodeEngineExt from '@alilc/lowcode-engine-ext';

//Set the built-in setter and event binding, plug-in binding panel
const DefaultSettersDialogRegistryPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { pluginMap } = AliLowCodeEngineExt;
      const { skeleton } = ctx;
      //Register plugin
      //Register event binding panel
      skeleton.add({
        area: 'centerArea',
        type: 'Widget',
        content: pluginMap.EventBindDialog,
        name: 'eventBindDialog',
      });

      //Register variable binding panel
      skeleton.add({
        area: 'centerArea',
        type: 'Widget',
        content: pluginMap.VariableBindDialog,
        name: 'variableBindDialog',
      });
    },
  };
}
DefaultSettersDialogRegistryPlugin.pluginName = 'DefaultSettersDialogRegistryPlugin';
export default DefaultSettersDialogRegistryPlugin;