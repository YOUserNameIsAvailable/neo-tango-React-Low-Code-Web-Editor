import React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Dropdown, Menu } from '@alifd/next';
import './index.scss';
export interface IProps {
  logo?: string;
  href?: string;
  scenarioInfo?: any;
  scenarioDisplayName?: string;
}

const Logo: React.FC<IProps> = (props): React.ReactElement => {
  const { scenarioDisplayName, scenarioInfo } = props;
  const urls = scenarioInfo?.urls || [];
  return (
    <div className="lowcode-plugin-logo">
      <a className="logo" target="blank" href={props.href || '/'} style={{ backgroundImage: `url(${props.logo})` }} />
      <div className="scenario-name">{scenarioDisplayName}</div>
      {/* {
      urls && (
        <Dropdown
          className="info-dropdown"
          trigger={(
            <img
              style={{
                height: '18px',
                position: 'relative',
                top: '-2px',
              }}
              src="https://img.alicdn.com/imgextra/i4/O1CN013upU1R1yl5wVezP8k_!!6000000006618-2-tps-512-512.png"
            />
          )}
          triggerType="click"
        >
          <Menu onItemClick={(key, item) => window.open(key, '_blank')}>
            {
              urls.map((url: any) => <Menu.Item key={url.value}>{url.key}</Menu.Item>)
            }
          </Menu>
        </Dropdown>
      )
    } */}
    </div>
  );
};
//Example Logo widget
const LogoSamplePlugin = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    async init() {
      const { skeleton, config } = ctx;
      const scenarioName = options['scenarioName'];
      const scenarioDisplayName = options['displayName'] || scenarioName;
      const scenarioInfo = options['info'] || {};

      //Save in config for engine-wide use by other plugins
      config.set('scenarioName', scenarioName);
      config.set('scenarioDisplayName', scenarioDisplayName);
      config.set('scenarioInfo', scenarioInfo);

      //Register logo widget
      skeleton.add({
        area: 'topArea',
        type: 'Widget',
        name: 'logo',
        content: <Logo scenarioDisplayName={scenarioDisplayName} scenarioInfo={scenarioInfo}  />,
        contentProps: {
          logo: '/favicon.png',
          href: '/',
        },
        props: {
          align: 'left',
        },
      });
    },
  };
}
LogoSamplePlugin.pluginName = 'LogoSamplePlugin';
LogoSamplePlugin.meta = {
  dependencies: [],
  preferenceDeclaration: {
    title: 'Save plugin configuration',
    properties: [
      {
        key: 'scenarioName',
        type: 'string',
        description: 'Used for localstorage storage key',
      },
      {
        key: 'displayName',
        type: 'string',
        description: 'Scene name for display',
      },
      {
        key: 'info',
        type: 'object',
        description: 'for extended information',
      }
    ],
  },
};
export default LogoSamplePlugin;