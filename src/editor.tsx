import './global.scss';

import ReactDOM from 'react-dom';
import { init, workspace } from '@alilc/lowcode-engine';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';
import ZhEnPlugin from '@alilc/lowcode-plugin-zh-en';
import SchemaPlugin from '@alilc/lowcode-plugin-schema';
import pageResourceType from './page/resourceType';
import LogoSamplePlugin from './plugins/plugin-logo-sample';
import WorkspaceEmptyPlugin from './plugins/plugin-workspace-empty';
import pluginResourceData from './plugins/plugin-resource-data';
import InjectPlugin from '@alilc/lowcode-plugin-inject';
// Application level top secondary panel
import pluginResourceTabs from '@alilc/lowcode-plugin-resource-tabs';
// App-level left panel
import pluginViewManagerPane from '@alilc/lowcode-plugin-view-manager-pane';
import SaveSamplePlugin from './plugins/plugin-save-sample';
import PreviewSamplePlugin from './plugins/plugin-preview-sample';
import SimulatorLocalePlugin from './plugins/plugin-simulator-locale';
import DefaultSettersDialogRegistryPlugin from './plugins/plugin-default-setters-dialog-registry';
import { translator } from './utils/translator';
import { Login } from './components/Login';
import appHelper from './utils/app-helper';
import { getUser } from './utils/firebase/auth';
import { initFirebase } from './utils/firebase';
import viewController from './utils/view-controller';

async function initEditor() {
  //Register application-level resource types
  workspace.registerResourceType(pageResourceType);

  await workspace.plugins.register(InjectPlugin);

  await workspace.plugins.register(LogoSamplePlugin, {
    scenarioName: 'general',
    displayName: 'React Low-code Editor',
    info: {
      urls: [
        {
          key: 'Designer',
          value: 'https://github.com/alibaba/lowcode-demo/tree/main/demo-general',
        },
        {
          key: 'fusion-ui material',
          value: 'https://github.com/alibaba/lowcode-materials/tree/main/packages/fusion-ui',
        },
        {
          key: 'fusion material',
          value:
            'https://github.com/alibaba/lowcode-materials/tree/main/packages/fusion-lowcode-materials',
        },
      ],
    },
  });

  await workspace.plugins.register(SchemaPlugin as any, { isProjectSchema: true });

  //Register to switch between Chinese and English
  await workspace.plugins.register(ZhEnPlugin as any);

  await workspace.plugins.register(WorkspaceEmptyPlugin as any);

  await workspace.plugins.register(pluginResourceData);

  await workspace.plugins.register(SaveSamplePlugin);

  await workspace.plugins.register(PreviewSamplePlugin);

  await workspace.plugins.register(DefaultSettersDialogRegistryPlugin);

  //Application level top secondary panel
  await workspace.plugins.register(pluginResourceTabs, {
    appKey: 'general',
    shape: 'text',
    onSort: (e: any[]) => {
      return e;
      // return uniqBy(e, 'id')
      // .map((x) => {
      //     // console.log('onSort:', x);
      //     // if (e?.resource?.id) return x;
      //   })
      //   .filter((x) => x);
    },
  });

  // Designer area multi-language switching
  await workspace.plugins.register(SimulatorLocalePlugin);

  // App-level left panel
  await workspace.plugins.register(pluginViewManagerPane, {
    init: viewController.init,
    onAddPage: viewController.onAddPage,
    onDeletePage: viewController.onDeletePage,
    showIconText: false,
  });

  await init(document.getElementById('editor-container')!, {
    locale: 'en-US',
    designMode: 'design',
    enableWorkspaceMode: true,
    enableAutoOpenFirstWindow: false,
    enableCondition: true,
    enableCanvasLock: true,
    stayOnTheSameSettingTab: true,
    //Default bind variables
    supportVariableGlobally: true,
    requestHandlersMap: {
      fetch: createFetchHandler(),
    },
    appHelper,
  });
  // .then(async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // add skiptranslate class
  // const observer = new MutationObserver((mutations, obs) => {
  //   ['lc-workbench-center'].forEach((targetClass: string) => {
  //     const els = document.querySelectorAll(`.${targetClass}`);
  //     if (!els.length) return;
  //     els.forEach((x) => x?.classList.add('skiptranslate'));
  //     // obs.disconnect();
  //   });
  // });
  // observer.observe(document, { childList: true, subtree: true });
  // });
}

(async () => {
  await translator();
  await initFirebase();

  if (!(await getUser())?.email) {
    ReactDOM.render(<Login />, document.getElementById('editor-container'));
    return;
  }

  await initEditor();
})();
