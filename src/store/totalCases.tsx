import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import httpService from 'services';
import { IRootDispatch } from './index';

interface ITotalCases {
    active: number;
    affectedCountries: number;
    cases: number;
    casesPerOneMillion: number;
    critical: number;
    deaths: number;
    deathsPerOneMillion: number;
    recovered: number;
    tests: number;
    testsPerOneMillion: number;
    todayCases: number;
    todayDeaths: number;
    updated: number;
}

export type ITotalCasesState = {
    isLoading: boolean;
    data?: ITotalCases;
    error?: string;
};

export const initialState: ITotalCasesState = {
    isLoading: false,
    data: undefined,
    error: undefined,
};

export const totalCasesModule = createSlice({
    name: 'totalCases',
    initialState,
    reducers: {
        requestTotalCases: (state) => {
            state.isLoading = true;
        },
        requestTotalCasesSuccess: (state, action: PayloadAction<ITotalCases>) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        requestTotalCasesError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

const { actions, reducer } = totalCasesModule;

const fetchTotalCases = () => (dispatch: IRootDispatch) => {
    dispatch(actions.requestTotalCases());
    return httpService.get('all')
        .then((response) => {
            dispatch(actions.requestTotalCasesSuccess(response.data));
        })
        .catch((error) => dispatch(actions.requestTotalCasesError(error.toString())));
};

export const thunks = {
    fetchTotalCases,
};

export { actions };

export default reducer;
