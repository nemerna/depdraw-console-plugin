import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // You can use thunk middleware for async actions
import rootReducer from './reducers/rootReducers'; // Create this file for your reducers

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
