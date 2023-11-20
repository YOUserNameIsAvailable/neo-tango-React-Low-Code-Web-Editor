// @ts-ignore
import { IPublicModelPluginContext, IPublicTypeResourceType } from '@alilc/lowcode-types';
import { pageView } from './pageView';
import { PageIcon } from '../icon';

const pageResourceType: IPublicTypeResourceType = (ctx: IPublicModelPluginContext) => {
  return {
    category: 'Page',
    description: 'page',
    // Default view type
    defaultViewName: 'page',
    // defaultTitle: window.pageConfig?.title,
    // Current resource view
    editorViews: [pageView],
    icon: PageIcon,
    async import(schema: any) {
      return {
        page: schema,
      };
    },
    async save({ page }) {
      return page;
    },
  };
};

pageResourceType.resourceName = 'page';
pageResourceType.resourceType = 'editor';

export default pageResourceType;
