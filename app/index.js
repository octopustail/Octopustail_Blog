import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import configureStore from './configureStore';

let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

const mountNode = document.getElementById('app');

const store = configureStore;


render(
    <Provider store={store}>
        <h1>hello</h1>
    </Provider>, mountNode
)