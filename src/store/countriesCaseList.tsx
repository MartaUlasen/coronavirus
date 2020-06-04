import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import httpService from 'services';
import { IRootDispatch } from './index';

export interface ICountry {
    updated: number;
    country: string;
    countryInfo: {};
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    population: number;
}

export type ICountriesCaseListState = {
    isLoading: boolean;
    data?: ICountry[];
    error?: string;
};

export const initialState: ICountriesCaseListState = {
    isLoading: false,
    data: undefined,
    error: undefined,
};

export const countriesCaseListModule = createSlice({
    name: 'countriesCaseList',
    initialState,
    reducers: {
        requestCountriesCaseList: (state) => {
            state.isLoading = true;
        },
        requestCountriesCaseListSuccess: (state, action: PayloadAction<ICountry[]>) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        requestCountriesCaseListError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

const { actions, reducer } = countriesCaseListModule;

const fetchCountriesCaseList = () => (dispatch: IRootDispatch) => {
    dispatch(actions.requestCountriesCaseList());
    return httpService.get('countries?sort=cases')
        .then((response) => {
            dispatch(actions.requestCountriesCaseListSuccess(response.data));
        })
        .catch((error) => dispatch(actions.requestCountriesCaseListError(error.toString())));
};

export const thunks = {
    fetchCountriesCaseList,
};

const listCountries = createSelector(
    (state: ICountriesCaseListState) => state.data,
    (data) => data?.map((item) => item.country),
);

export const selectors = {
    listCountries,
};

export { actions };

export default reducer;
