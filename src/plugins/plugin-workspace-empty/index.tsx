import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Empty } from './empty';
import React from 'react';

export interface PreviewPaneOptions {
  applicationCode: string;
  branchId: string;
  routerMode: string;
  deployConfig: Record<string, string>;
}

const plugin = (ctx: IPublicModelPluginContext, options: PreviewPaneOptions) => {
  const { config, workspace } = ctx;

  return {
    init() {
      workspace.onResourceListChange(() => {
        config.set('workspaceEmptyComponent', () => <Empty pluginContext={ctx} />);
      });
    },
  };
};

plugin.pluginName = 'workspaceEmpty';
plugin.meta = {
  dependencies: [],
  engines: {
    lowcodeEngine: '^1.0.0', //The plug-in needs to work with the ^1.0.0 engine to run
  },
};

export default plugin;
