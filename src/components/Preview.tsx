import React, { useState } from 'react';
import { Loading, Shell, Icon, Box, Button, Nav } from '@alifd/next';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import { buildComponents, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import { PreviewDataType } from 'src/types';
import { getProjectSchema, getResourceList, getSchema } from 'src/services/cacheService';
import { firebaseAuth } from 'src/utils/firebase';
import appHelper from 'src/utils/app-helper';

function customizer(objValue: [], srcValue: []) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue || []);
  }
}

const getScenarioName = function () {
  if (location.search) {
    return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'general';
  }
  return 'general';
};

export const Preview: React.FC = () => {
  const [data, setData] = useState<PreviewDataType>({} as PreviewDataType);
  const [activeSchema, setActiveSchema] = useState<any>();
  const [activeNav, setActiveNav] = useState<string>();

  const scenarioName = getScenarioName();

  async function init() {
    const resourceList = await getResourceList(scenarioName);

    const componentsMap: any = {};
    const libraryMap: any = {};
    const libraryAsset: any[] = [];
    const projectDataSource: any[] = [];

    for (const { id } of resourceList) {
      const { packages, projectSchema } = await getSchema(scenarioName, id);
      const { componentsMap: componentsMapArray, i18n, dataSource } = projectSchema || {};

      // get components
      componentsMapArray?.forEach((component: any) => {
        componentsMap[component.componentName] = component;
      });

      // get libs
      packages?.forEach(({ package: _package, library, urls, renderUrls }) => {
        libraryMap[_package] = library;
        if (renderUrls) {
          libraryAsset.push(renderUrls);
        } else if (urls) {
          libraryAsset.push(urls);
        }
      });

      // get dataSources
      projectDataSource.concat(dataSource || []);
    }

    // const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

    // load assets
    // TODO asset may cause pollution
    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    const components = await injectComponents(buildComponents(libraryMap, componentsMap, (s) => s));

    // activate first page
    const id = resourceList?.[0].id;
    const projectSchema = await getProjectSchema(scenarioName, id);
    setActiveSchema(projectSchema?.componentsTree[0]);
    setActiveNav(id);

    setData({
      components,
      i18n: projectSchema?.i18n,
      projectDataSource,
      resourceList,
    });
  }

  const { components, i18n = {}, projectDataSource = {} } = data;

  if (!activeSchema || !components) {
    init();
    return <Loading fullScreen />;
  }

  // const currentLocale = await getPreviewLocale(getScenarioName());

  // if (!(window as any).setPreviewLocale) {
  //   // for demo use only, can use this in console to switch language for i18n test
  //   //View the switching effect in the console window.setPreviewLocale('en-US') or window.setPreviewLocale('zh-CN')
  //   (window as any).setPreviewLocale = (locale: string) =>
  //     await setPreviewLocale(getScenarioName(), locale);
  // }

  return (
    <React.Fragment className="lowcode-plugin-sample-preview">
      <Shell className={'iframe-hack'} device="desktop" style={{ border: '1px solid #eee' }}>
        <Shell.Branding>
          <div className="rectangular"></div>
          <span style={{ marginLeft: 10 }}>App Name</span>
        </Shell.Branding>
        <Shell.Navigation direction="hoz">
          <Box direction="row" spacing={10}>
            {firebaseAuth?.currentUser && (
              <Button
                onClick={async () => {
                  await firebaseAuth.signOut();
                  window.location.reload();
                }}
              >
                <Icon type="exit" />
                Sign out
              </Button>
            )}
            <Button href="/editor.html" component="a">
              Go to Editor
            </Button>
          </Box>

          {/* <Search            
              shape="simple"
              type="dark"
              palceholder="Search"
              style={{ width: '200px' }}
            /> */}
        </Shell.Navigation>

        <Shell.Navigation>
          <Nav embeddable aria-label="global navigation" defaultSelectedKeys={[activeNav]}>
            {data?.resourceList?.map((d) => (
              <Nav.Item
                key={d.id}
                onClick={() => {
                  getProjectSchema(scenarioName, d.id).then((projectSchema) => {
                    setActiveSchema(projectSchema?.componentsTree?.[0]);
                  });
                }}
                icon="account"
              >
                {d.title}
              </Nav.Item>
            ))}
          </Nav>
        </Shell.Navigation>

        <Shell.Content>
          <div style={{ minHeight: 1200, background: '#fff' }}>
            <ReactRenderer
              className="lowcode-plugin-sample-preview-content"
              schema={{
                ...activeSchema,
                dataSource: mergeWith(activeSchema.dataSource, projectDataSource, customizer),
              }}
              components={components}
              locale={'en-US'}
              messages={i18n}
              appHelper={appHelper}
            />
          </div>
        </Shell.Content>
      </Shell>
    </React.Fragment>
  );
};
