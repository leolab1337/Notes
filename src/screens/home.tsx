import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Button, StyleSheet, BackHandler } from 'react-native';

import { screenkeysEn, screenkeysFi, } from './_index';

const settingOpts = (opts = { lang: 'EN' }) => {
  const _settings = {
    lang: opts.lang,
  };
  return _settings;
};

const Home = ({
  navigation,
  dispatch,
  lang,
}: {
  navigation: any;
  dispatch: any;
  lang: string;
}) => {
  // const [settings, initSettings] = React.useState(settingOpts());
  const { t, i18n } = useTranslation();

  useEffect(() => {
    AsyncStorage.getItem('settings')
      .then((settingsJSON: JSON | any) => {
        const _settings = settingOpts(JSON.parse(settingsJSON));
        console.log({ _settings, settingsJSON });
        i18n.changeLanguage(_settings.lang);
        dispatch({ type: _settings.lang });
      })
      .catch((settingsJSON: JSON | any) => {
        const _settings = settingOpts();
        console.log({ _settings, settingsJSON });
        i18n.changeLanguage(_settings.lang);
        dispatch({ type: _settings.lang });
      });
  }, []);


  let screenkeys: any = screenkeysFi;

  if (lang == 'FI') {
    screenkeys = screenkeysFi
  }

  else if (lang == "EN") {
    screenkeys = screenkeysEn
  }

  else {
    screenkeys = screenkeysFi
  }

  return (
    <><View style={styles.main}>

      <Text onPress={() => alert(t('welcome'))}> {t('home')}</Text>
      <Text onPress={() => BackHandler.exitApp()}>{t('exit')}</Text>
      {screenkeys.map(
        (skey: string, index: number) => skey !== 'home' && skey !== 'note-editor' && skey !== "muistiinpanoeditori" && (
          <View style={styles.btn} key={'home-' + skey}>
            {/* <Button title={(lang == "FI") ? screenkeysFi[index] : skey} onPress={() => navigation.navigate(skey)} /> */}
            {/* <Button title={skey} onPress={() => navigation.navigate(skey)} /> */}
            <Button title={skey} onPress={() => navigation.navigate((lang !== "EN") ? screenkeysEn[index] : skey)} />
          </View>
        )
      )}
    </View><View style={styles.exitbutton}>
        <Button color="red" title={t('exit')} onPress={() => BackHandler.exitApp()}></Button>
      </View></>
  );
};

const styles = StyleSheet.create({
  main: {},
  btn: {
    marginTop: 16,
  },
  exitbutton: {
    marginTop: 16,

  }
});

export default Home;
