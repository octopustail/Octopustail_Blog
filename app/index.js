import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import configureStore from './configureStore';
import AppIndex from 'containers/index'
import {AppContainer} from 'react-hot-loader'


let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

const mountNode = document.getElementById('app');

const store = configureStore();


render(
    <AppContainer>
        <Provider store={store}>
            <IndexApp/>
        </Provider>
    </AppContainer>, mountNode
);


if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept();
}