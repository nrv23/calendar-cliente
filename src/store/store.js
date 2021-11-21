import { applyMiddleware, createStore,compose } from "redux";
import { rootReducer } from "../reducers/rootReducer";
import thunk from 'redux-thunk'; // para acciones asincronas, no precisamente llamadas http

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)