import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button, Box, Icon } from '@alifd/next';
import { firebaseAuth } from 'src/utils/firebase';

const SaveSamplePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, hotkey, config, workspace } = ctx;
      const scenarioName = config.get('scenarioName');

      skeleton.add({
        name: 'saveSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Box direction="row" spacing={10}>
            <Button
              onClick={async () => {
                await firebaseAuth.signOut();
                window.location.reload();
              }}
            >
              <Icon type="exit" />
              Sign out
            </Button>
            <Button
              onClick={async () => {
                await Promise.all(workspace.windows.map((d) => d.save()));
              }}
            >
              Save To Cloud
            </Button>
          </Box>
        ),
      });
      hotkey.bind('command+s', async (e) => {
        e.preventDefault();
        await Promise.all(workspace.windows.map((d) => d.save()));
      });
    },
  };
};

SaveSamplePlugin.pluginName = 'SaveSamplePlugin';
SaveSamplePlugin.meta = {
  dependencies: [],
};

export default SaveSamplePlugin;
