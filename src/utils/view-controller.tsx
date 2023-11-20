import React from 'react';
import { Dialog, Form, Input, Button } from '@alifd/next';
import { IPublicModelPluginContext, IPublicModelResource } from '@alilc/lowcode-types';

class Controller {
  pluginContext?: IPublicModelPluginContext;

  init = (ctx: IPublicModelPluginContext) => {
    // ctx?.workspace.openEditorWindowById(ctx?.workspace.resourceList);
    this.pluginContext = ctx;

    console.log({ ctx });
  };

  onAddPage = () => {
    const dialog = Dialog.show({
      v2: true,
      title: 'Add page',
      content: (
        <Form style={{ width: '500px' }} colon>
          <Form.Item name="title" label="Page name" required>
            <Input />
          </Form.Item>
          <Form.Item name="slug" label="Page ID" required>
            <Input />
          </Form.Item>
          <Form.Item label="" colon={false}>
            <Form.Submit
              type="primary"
              validate
              onClick={async (values, errors) => {
                const list = this.pluginContext?.workspace.resourceList.map((d) => d.options);

                list?.push({
                  slug: values.slug,
                  title: values.title,
                  id: values.slug,
                });

                await this.pluginContext?.plugins.pluginResourceData.update(list);

                const resource = this.pluginContext?.workspace.resourceList.filter(
                  (d) => d.id === values.slug,
                )?.[0];

                if (resource) this.pluginContext?.workspace.openEditorWindow(resource);

                dialog.hide();
              }}
              style={{ marginRight: 8 }}
            >
              Confirm
            </Form.Submit>
            <Button
              onClick={() => {
                dialog.hide();
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      ),
      footerActions: [],
    });
  };

  onDeletePage = async (resource: IPublicModelResource) => {
    Dialog.show({
      v2: true,
      title: 'Delete Page',
      content: `After deleting the page, it cannot be restored. Are you sure you want to delete the page ${resource.options.title}.`,
      onOk: async () => {
        this.pluginContext?.workspace.removeEditorWindow(resource.name!, resource.options.id);
        const list = this.pluginContext?.workspace.resourceList.map((d) => d.options);
        const newList = list?.filter((d) => d.id !== resource.options.id);

        await this.pluginContext?.plugins.pluginResourceData.update(newList);
      },
    });
  };
}

export default new Controller();
