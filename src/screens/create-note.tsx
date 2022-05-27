import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { writeNote } from '../utils/myfscopy';

const settingOpts = (opts = { lang: 'EN' }) => {
  const _settings = {
    lang: opts.lang,
  };
  return _settings;
};


const CreateNote = ({ dispatch, lang }: { dispatch: any, lang: string }) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    AsyncStorage.getItem('settings')
      .then((settingsJSON: any) => {
        const _settings = settingOpts(JSON.parse(settingsJSON));
        console.log({ _settings, settingsJSON });
        i18n.changeLanguage(_settings.lang);
        dispatch({ type: _settings.lang });
      })
      .catch((settingsJSON: any) => {
        const _settings = settingOpts();
        console.log({ _settings, settingsJSON });
        i18n.changeLanguage(_settings.lang);
        dispatch({ type: _settings.lang });
      });
  }, []);

  const _tin = { min: 1, max: 10, format: '.txt' }; // min,max title size
  const [title, titleChange] = React.useState('');
  const [content, contentChange] = React.useState('');

  const save = () => {
    if (_tin.min <= title.length && title.length <= _tin.max) {
      writeNote(title, content, _tin.format)
        .then(() => console.log('success write note'))
        .catch(() => console.log('failed write note'));
    } else {
      // handle bad topic
      console.log('bad topic');
      console.log({ title, _tin });
    }
  };

  return (
    <View>
      {/* <Text>create-note</Text> */}
      <Text>{t('createNote')}</Text>
      <TextInput
        style={styles.tinput}
        onChangeText={titleChange}
        value={title}
        placeholder={t('title')}
      />
      <TextInput
        style={styles.tarea}
        onChangeText={contentChange}
        value={content}
        placeholder={t('content')}
        multiline={true}
      />
      <Button title={t('save')} onPress={() => save()} />
    </View>
  );
};

const styles = StyleSheet.create({
  tarea: {
    height: 160,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  tinput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default CreateNote;
