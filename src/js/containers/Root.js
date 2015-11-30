import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import App from './App';
import DevTools from './DevTools';

const store = configureStore();

export default class Root extends Component {
  componentDidMount(){
  	console.log(this.props);
  }
  render() {
    return (
      <Provider store={store}>
      	<div>
        <App />
        
        </div>
      </Provider>
    );
  }
}