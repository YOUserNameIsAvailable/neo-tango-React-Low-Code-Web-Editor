import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import AliLowCodeEngineExt from '@alilc/lowcode-engine-ext';

//Set the built-in setter and event binding, plug-in binding panel
const DefaultSettersRegistryPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { setterMap } = AliLowCodeEngineExt;
      const { setters } = ctx;
      //Register setterMap
      setters.registerSetter(setterMap);
    },
  };
}

DefaultSettersRegistryPlugin.pluginName = 'DefaultSettersRegistryPlugin';
export default DefaultSettersRegistryPlugin;