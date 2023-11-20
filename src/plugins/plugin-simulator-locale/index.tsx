import React, { useEffect } from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Select } from '@alifd/next';

const Option = Select.Option;
export interface IProps {
  currentLocale: string;
  onChange: (value: string) => void;
}

function GoogleTranslateButton() {
  useEffect(() => {
    function googleTranslateElementInit() {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'zh',
          includedLanguages: 'en,ko,zh',
          autoDisplay: false,
          disableAutoTranslation: true, // Only translate when needed, to avoid conflict with React.js
        },
        'google_translate_element',
      );
    }

    const script = document.createElement('script');
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
    (window as any).googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      const googGtTT = document.getElementById('goog-gt-tt');
      const googleTranslateIFrame = document.getElementsByClassName('goog-te-menu-frame');
      const googleTranslateSpinner = document.getElementsByClassName('goog-te-spinner-pos');

      if (googleTranslateSpinner && Array.isArray(googleTranslateSpinner)) {
        googleTranslateSpinner.forEach((element) => element.remove());
      }

      if (googleTranslateIFrame && Array.isArray(googleTranslateIFrame)) {
        googleTranslateIFrame.forEach((iframe) => iframe.remove());
      }

      if (googGtTT) {
        googGtTT.remove();
      }

      if (window && (window as any).googleTranslateElementInit) {
        delete (window as any).googleTranslateElementInit;
      }
    };
  }, []);

  return <div id="google_translate_element"></div>;
}

const LocaleSelect: React.FC<IProps> = (props): React.ReactElement => {
  const { currentLocale, onChange } = props;
  const currentLocaleValue = currentLocale || 'en-US';
  return (
    <div className="lowcode-plugin-simulator-locale-select">
      {/* <Select
        id="select"
        onChange={onChange}
        defaultValue={currentLocaleValue}
        aria-label="切换画布区域 locale"
        style={{ marginRight: 8 }}
      >
        <Option value="zh-CN">中文</Option>
        <Option value="en-US">English</Option>
      </Select> */}
      {/* <GoogleTranslateButton /> */}
    </div>
  );
};

// Canvas region language switching
const SimulatorLocalePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { project, skeleton, config } = ctx;
      const currentLocale = project.simulatorHost?.get('locale') || 'en-US';
      const onLocaleChange = (value: string): void => {
        config.set('locale', value);
      };
      skeleton.add({
        area: 'topArea',
        type: 'Widget',
        name: 'simulatorLocale',
        content: <LocaleSelect currentLocale={currentLocale} onChange={onLocaleChange} />,
        props: {
          align: 'center',
        },
      });
    },
  };
};

SimulatorLocalePlugin.pluginName = 'SimulatorLocalePlugin';
SimulatorLocalePlugin.meta = {};

export default SimulatorLocalePlugin;
