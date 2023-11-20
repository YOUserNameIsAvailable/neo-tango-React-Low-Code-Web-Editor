import { IPublicModelPluginContext, IPublicResourceData } from '@alilc/lowcode-types';
import uniqBy from 'lodash/uniqBy';
import { ResourceItem, getResourceList, setResourceList } from 'src/services/cacheService';

export function pluginResourceData(ctx: IPublicModelPluginContext) {
  const { workspace } = ctx;

  function updateResourceList(list: ResourceItem[]) {
    workspace.setResourceList([
      ...uniqBy(list, 'id').map(
        (d) =>
          ({
            resourceName: 'page',
            title: d.title,
            id: d.slug,
            category: 'Page',
            config: {},
            options: {
              title: d.title,
              slug: d.slug,
              id: d.slug,
            },
          } as IPublicResourceData),
      ),
    ]);
  }

  return {
    exports() {
      const scenarioName = ctx.config.get('scenarioName');
      return {
        async update(list: ResourceItem[]) {
          await setResourceList(scenarioName, list);
          updateResourceList(list);
        },
      };
    },
    async init() {
      const scenarioName = ctx.config.get('scenarioName');
      const pageList = await getResourceList(scenarioName);

      await setResourceList(scenarioName, pageList);

      updateResourceList(pageList);
    },
  };
}

pluginResourceData.pluginName = 'pluginResourceData';

export default pluginResourceData;
