import React, { FC, useEffect, useRef } from 'react';
import { useSize } from 'ahooks';
import { Box } from '@airtable/blocks/ui';
import { Settings, MindFlow, IntlProvider } from './components';
import { useSettingsStore, useShowSettings, useI18n } from './models';
import { loadCSS } from './globalStyle';

loadCSS();

const App: FC = () => {
  const { isShowSettings, setShowSettings } = useShowSettings();
  const { settings, isValid } = useSettingsStore();
  const { locale, messages } = useI18n();

  const graph = useRef(null);
  const canvas = useRef(null);
  const size = useSize(canvas);

  useEffect(() => {
    if (!isValid && !isShowSettings) {
      setShowSettings(true);
    }
  }, [setShowSettings, isValid, isShowSettings]);

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={'en'}
      // @ts-ignore
      messages={messages ? messages : {}}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        backgroundColor="#f5f5f5"
        overflow="hidden"
      >
        <Box
          ref={canvas}
          style={{
            width: isShowSettings ? 'calc(100% - 300px)' : '100%',
          }}
        >
          <MindFlow width={size.width} height={size.height} />
        </Box>
        {isShowSettings && (
          <Settings graph={graph} settings={settings} isValid={isValid} />
        )}
      </Box>
    </IntlProvider>
  );
};

export default App;
