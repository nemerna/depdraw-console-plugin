// rootReducer.js

import { combineReducers } from 'redux';
import diagramReducer from './diagramReducer';


const rootReducer = combineReducers({
  diagram: diagramReducer,
});

export default rootReducer;
