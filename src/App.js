import React from 'react';
import {Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';
import './styles.css'
export const App = () => {
    // proveer toda la información de los reducer con el provider de redux
    return (
        <Provider store={store}> 
            <AppRouter />
        </Provider>
    )
}
