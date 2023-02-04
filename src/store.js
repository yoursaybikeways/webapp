import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/root-reducer';

export default configureStore({
    reducer: rootReducer,
})
