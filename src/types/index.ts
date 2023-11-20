export interface PackageInfo {
  package: string;
  version?: string;
  title?: string;
  urls: string[];
  library?: string;
  editUrls?: string[];
  renderUrls?: string[];
  advancedUrls?: {
    [key: string]: string[];
  };
  advancedEditUrls?: {
    [key: string]: string[];
  };
}

export interface ResourceItem {
  title: string;
  slug: string;
  id: string;
}

export interface ProjectSchema {
  version: string;
  componentsMap: any[];
  componentsTree: any[];
  i18n: {
    [key: string]: Record<string, string>;
  };
  dataSource: any;
}

export interface PreviewDataType {
  components: any;
  projectDataSource: any[];
  resourceList: ResourceItem[];
  i18n?: {
    [key: string]: Record<string, string>;
  };
}
