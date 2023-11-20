import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button } from '@alifd/next';
import { material } from '@alilc/lowcode-engine';
import { Message } from '@alifd/next';

const loadIncrementalAssets = () => {
  material?.onChangeAssets(() => {
    Message.success('[MCBreadcrumb] Material loading successful');
  });

  material.loadIncrementalAssets({
    packages: [
      {
        title: 'MCBreadcrumb',
        package: 'mc-breadcrumb',
        version: '1.0.0',
        urls: [
          'https://unpkg.alibaba-inc.com/mc-breadcrumb@1.0.0/dist/MCBreadcrumb.js',
          'https://unpkg.alibaba-inc.com/mc-breadcrumb@1.0.0/dist/MCBreadcrumb.css',
        ],
        library: 'MCBreadcrumb',
      },
    ],
    components: [
      {
        componentName: 'MCBreadcrumb',
        title: 'MCBreadcrumb',
        docUrl: '',
        screenshot: '',
        npm: {
          package: 'mc-breadcrumb',
          version: '1.0.0',
          exportName: 'MCBreadcrumb',
          main: 'lib/index.js',
          destructuring: false,
          subName: '',
        },
        props: [
          {
            name: 'prefix',
            propType: 'string',
            description: 'Brand prefix of style class name',
            defaultValue: 'next-',
          },
          {
            name: 'title',
            propType: 'string',
            description: 'Title',
            defaultValue: 'next-',
          },
          {
            name: 'rtl',
            propType: 'bool',
          },
          {
            name: 'children',
            propType: {
              type: 'instanceOf',
              value: 'node',
            },
            description: 'Breadcrumb sub-node, need to pass in Breadcrumb.Item',
          },
          {
            name: 'maxNode',
            propType: {
              type: 'oneOfType',
              value: [
                'number',
                {
                  type: 'oneOf',
                  value: ['auto'],
                },
              ],
            },
            description:
              'The maximum number of breadcrumbs can be displayed, and the excess will be hidden. If set to auto, it will automatically adapt according to the width of the parent element',
            defaultValue: 100,
          },
          {
            name: 'separator',
            propType: {
              type: 'instanceOf',
              value: 'node',
            },
            description: 'Delimiter, can be text or Icon',
          },
          {
            name: 'component',
            propType: {
              type: 'oneOfType',
              value: ['string', 'func'],
            },
            description: 'Set label type',
            defaultValue: 'nav',
          },
          {
            name: 'className',
            propType: 'any',
          },
          {
            name: 'style',
            propType: 'object',
          },
        ],
        configure: {
          component: {
            isContainer: true,
            isModel: true,
            rootSelector: 'div.MCBreadcrumb',
          },
        },
      },
    ],
    componentList: [
      {
        title: 'Commonly used',
        icon: '',
        children: [
          {
            componentName: 'MCBreadcrumb',
            title: 'MC Breadcrumbs',
            icon: '',
            package: 'mc-breadcrumb',
            library: 'MCBreadcrumb',
            snippets: [
              {
                title: 'MC Breadcrumbs',
                screenshot:
                  'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_breadcrumb.png',
                schema: {
                  componentName: 'MCBreadcrumb',
                  props: {
                    title: 'Material Center',
                    prefix: 'next-',
                    maxNode: 100,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  });
};

const LoadIncrementalAssetsWidgetPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton } = ctx;

      skeleton.add({
        name: 'loadAssetsSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
          width: 80,
        },
        content: <Button onClick={loadIncrementalAssets}>Load resources asynchronously</Button>,
      });
    },
  };
};

LoadIncrementalAssetsWidgetPlugin.pluginName = 'LoadIncrementalAssetsWidgetPlugin';
export default LoadIncrementalAssetsWidgetPlugin;
