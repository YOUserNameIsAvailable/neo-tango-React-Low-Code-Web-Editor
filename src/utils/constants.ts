import { IPublicTypeProjectSchema } from '@alilc/lowcode-types';
import { material } from '@alilc/lowcode-engine';

export const generateProjectSchema = (
  pageSchema: any,
  i18nSchema: any,
): IPublicTypeProjectSchema => {
  return {
    componentsTree: [pageSchema],
    componentsMap: material.componentsMap as any,
    version: '1.0.0',
    i18n: i18nSchema,
  };
};

export const getResourceListKey = (scenarioName?: string, id?: string) =>
  getLSName(scenarioName, id, 'resourceList');

export const getProjectSchemaKey = (scenarioName?: string, id?: string) =>
  getLSName(scenarioName, id, 'projectSchema');

export const getPackagesKey = (scenarioName?: string, id?: string) =>
  getLSName(scenarioName, id, 'packages');

export const getPreviewLocaleKey = (scenarioName?: string, id?: string) =>
  getLSName(scenarioName, id, 'previewLocale');

const getLSName = (scenarioName: string = 'general', id: string = '', ns: string = '') => {
  return [scenarioName, id, ns].filter((x) => x).join(':');
};
