import { project } from '@alilc/lowcode-engine';
import { Message, Dialog } from '@alifd/next';
import {
  IPublicTypeProjectSchema,
  IPublicModelPluginContext,
  IPublicEnumTransformStage,
} from '@alilc/lowcode-types';
import DefaultPageSchema from './defaultPageSchema.json';
import DefaultI18nSchema from './defaultI18nSchema.json';
import { filterPackages } from '@alilc/lowcode-plugin-inject';
import {
  generateProjectSchema,
  getPackagesKey,
  getPreviewLocaleKey,
  getProjectSchemaKey,
  getResourceListKey,
} from 'src/utils/constants';
import { PackageInfo, ProjectSchema, ResourceItem } from 'src/types';
import { getFromRtdb, setRtdb } from 'src/utils/firebase/rtdb';

export const getSchema = async (scenarioName: string, id: string) => {
  const packages = await getPackages(scenarioName, id);
  const projectSchema = await getProjectSchema(scenarioName, id);

  return { packages, projectSchema };
};

export const saveSchema = async (
  scenarioName: string,
  id: string,
  ctx: IPublicModelPluginContext,
) => {
  await setProjectSchema(scenarioName, id, ctx);
  await setPackages(scenarioName, id, ctx);

  Message.success('Successfully saved to cloud 🚀');
};

export const resetSchema = async (scenarioName: string) => {
  try {
    await new Promise<void>((resolve, reject) => {
      Dialog.confirm({
        content: 'Are you sure you want to reset? All your edits will be lost!',
        onOk: () => {
          resolve();
        },
        onCancel: () => {
          reject();
        },
      });
    });
  } catch (err) {
    return;
  }

  const defaultSchema = generateProjectSchema(DefaultPageSchema, DefaultI18nSchema);

  project.importSchema(defaultSchema);
  project.simulatorHost?.rerender();

  await setProjectSchema(scenarioName);
  await setPackages(scenarioName);

  Message.success('Page reset successfully');
};

export const getPageSchema = async (scenarioName: string, id: string) => {
  const pageSchema = (await getProjectSchema(scenarioName, id))?.componentsTree?.[0];
  if (pageSchema) {
    return pageSchema;
  }

  return DefaultPageSchema;
};

export const getDefaultProjectSchema = async (
  scenarioName: string,
  id: string,
): Promise<IPublicTypeProjectSchema> => {
  const pageSchema = await getPageSchema(scenarioName, id);
  return generateProjectSchema(pageSchema, DefaultI18nSchema);
};

export const getResourceList = async (scenarioName: string): Promise<ResourceItem[]> => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return [];
  }

  const list = await getItem(getResourceListKey(scenarioName));
  return list || [{ title: 'Home page', slug: 'index', id: 'index' }];
};

export const setResourceList = async (scenarioName: string, list: ResourceItem[]) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }

  if (!list.length) {
    console.error('list is required!');
    return;
  }

  await setItem(getResourceListKey(scenarioName), list);
};

export const getProjectSchema = async (
  scenarioName: string,
  id: string,
): Promise<ProjectSchema | undefined> => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }

  return getItem(getProjectSchemaKey(scenarioName, id));
};

export const setProjectSchema = async (
  scenarioName: string,
  id?: string,
  ctx?: IPublicModelPluginContext,
): Promise<void> => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }

  await setItem(
    getProjectSchemaKey(scenarioName, id),
    ctx?.project.exportSchema(IPublicEnumTransformStage.Save),
  );
};

export const getPackages = async (
  scenarioName: string,
  id: string,
): Promise<PackageInfo[] | undefined> => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }

  return getItem(getPackagesKey(scenarioName, id)) || [];
};

export const setPackages = async (
  scenarioName: string,
  id?: string,
  ctx?: IPublicModelPluginContext,
): Promise<void> => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }

  const packages = await filterPackages(ctx?.material.getAssets()?.packages);

  await setItem(getPackagesKey(scenarioName, id), packages);
};

export const getPreviewLocale = async (scenarioName: string): Promise<string> => {
  return getItem(getPreviewLocaleKey(scenarioName)) || 'en-US';
};

export const setPreviewLocale = async (scenarioName: string, locale: string): Promise<void> => {
  await setItem(getPreviewLocaleKey(scenarioName), locale || 'en-US');
  window.location.reload();
};

async function getItem(key: string): Promise<any | null> {
  // await getFromLS(key);
  return getFromRtdb(key);
}

async function setItem(key: string, value: any): Promise<void> {
  //  await setLS(key, value);
  return setRtdb(key, value);
}
