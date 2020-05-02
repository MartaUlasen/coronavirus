import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { allCasesModule } from './allCases';

const rootReducer = combineReducers({
    allCases: allCasesModule.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type IRootDispatch = typeof store.dispatch;
export type IGetRootState = typeof store.getState;
export type IRootState = ReturnType<typeof rootReducer>;

export default store;
