import React, { useContext, useReducer, useState } from 'react';
import './i18n';

import { Provider, connect, useSelector, ReactReduxContext } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { screensEn, screensFi, } from './screens/_index';


// A very simple reducer
function count(state: number, action: { type: string; }) {
  if (typeof state === 'undefined') return 0;

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function lang(state: string, action: { type: string; }) {
  if (typeof state === 'undefined') return 0;
  switch (action.type) {
    case 'EN':
      return 'EN';
    case 'FI':
      return 'FI';
    default:
      return 'EN';
  }
}

// A very simple store { count, lang }
export let store = createStore(combineReducers({
  count,
  lang
}));



const Stack = createNativeStackNavigator();





const App = () => {

  let screens: any;


  if (store.getState().lang == 'FI') {
    screens = screensFi;
  }

  else if (store.getState().lang == 'EN') {

    screens = screensEn;
  }

  else {
    screens = screensEn;
  }
  let stateContainers = screens.map((s: any) => {
    let screen = {
      ...s,
      statecomponent: connect((state: any) => ({ count: state.count, lang: state.lang }))(s.component)
    };
    return screen;
  })
  return (<Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screens[0].key}>
        {/* screens.map((s) => <Stack.Screen name={s.key} key={s.key} component={s.component} />) */}
        {stateContainers.map((s: any) => <Stack.Screen name={s.key} key={s.key} component={s.statecomponent} />)}
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>);
};

export default App;