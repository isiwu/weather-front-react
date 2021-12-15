// import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import { createStore } from 'redux';
import reducer from './reducer';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
const store = createStore(reducer);
export default store;
