import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { totalCasesModule } from './totalCases';
import { countriesCaseListModule } from './countriesCaseList';
import { historyCountriesCaseListModule } from './historyCountriesCaseList';

const rootReducer = combineReducers({
    totalCases: totalCasesModule.reducer,
    countriesCaseList: countriesCaseListModule.reducer,
    historyCountriesCaseList: historyCountriesCaseListModule.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type IRootDispatch = typeof store.dispatch;
export type IGetRootState = typeof store.getState;
export type IRootState = ReturnType<typeof rootReducer>;

export default store;
