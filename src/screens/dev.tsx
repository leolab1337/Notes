import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import { } from '../utils/myfscopy';


const settingOpts = (opts = { lang: 'EN' }) => {
  const _settings = {
    lang: opts.lang,
  };
  return _settings;
};

export const Dev = ({ count, dispatch, lang }: { count: number, dispatch: any, lang: string }) => {

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


  return (
    <View>
      <Text>dev</Text>
      <Text>{t('count')}: {count}</Text>
    </View>
  );
};
export default Dev;

