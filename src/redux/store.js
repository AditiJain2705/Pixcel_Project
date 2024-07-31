import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';  // thunk middleware for handling asynchronous actions
import rootReducer from './reducers'; 

// `applyMiddleware(thunk)` applies the thunk middleware to the store, enabling it to handle asynchronous actions
const store = createStore(
  rootReducer, 
  applyMiddleware(thunk) // Middleware to handle async actions, such as API calls
);

export default store; 