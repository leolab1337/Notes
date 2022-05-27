import CreateNote from './create-note';
import Home from './home';
import MyNotes from './mynotes';
import NoteEditor from './note-editor';
import Dev from './dev';
import Loading from './loading';
import TriggerLoading from './trigger-loading';
import Settings from './settings';
import Sensor from './sensor';
import Triggerloading1 from './trigger-loading1';
import { MyNotesDeletor } from './mynotesDeletor';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';






const { t, i18n } = useTranslation();





export const screenkeysEn = [
  // { t('home') },
  'home',
  'mynotes',
  'note-editor',
  'create-note',
  'MyNotesDeletor',
  'dev',
  // 'loading',
  // 'trigger-loading',
  'trigger-loading1',
  // 'sensor',
  'settings',
];

export const screenkeysFi = [
  // { t('home') },
  'home',
  'Minun-muistiinpanot',
  'muistiinpanoeditori',
  'luo-muistiinpano',
  'Minun-muistiinpanojen-poistaja',
  'devi',
  // 'loading',
  // 'trigger-loading',
  'trigger-lataus',
  // 'sensor',
  'asetukset',
];





export const screencomponents = [
  Home,
  MyNotes,
  NoteEditor,
  CreateNote,
  MyNotesDeletor,
  Dev,
  // Loading,
  // TriggerLoading,
  Triggerloading1,
  // Sensor,
  Settings,
];

export const screensEn = screenkeysEn.map((skey, i) => {
  const screen = {
    key: skey,
    component: screencomponents[i],
  };
  return screen;
});

export const screensFi = screenkeysFi.map((skey, i) => {
  const screen = {
    key: skey,
    component: screencomponents[i],
  };
  return screen;
});


