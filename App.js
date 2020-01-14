import React from 'react';
import { Provider } from 'react-redux';
import Main from './components/MainComponent';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
