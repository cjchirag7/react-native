import React from 'react';
import Main from './components/MainComponent';
import {Provider} from 'react-redux';
import {ConfigureStore} from './shared/redux/ConfigureStore.js';

const store=ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <Main />
    </Provider>
    );
  }
};