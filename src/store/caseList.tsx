import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import httpService from 'services';
import { IRootDispatch } from './index';

interface ICountry {
    Country: string,
    CountryCode: string,
    Slug: string,
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
    TotalRecovered: number,
    Date: string
}

interface ICaseList {
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

export type ICaseListState = {
    isLoading: boolean;
    data?: ICaseList;
    error?: string;
};

export const initialState: ICaseListState = {
    isLoading: false,
    data: undefined,
    error: undefined,
};

export const allCasesModule = createSlice({
    name: 'allCases',
    initialState,
    reducers: {
        requestAllCases: (state) => {
            state.isLoading = true;
        },
        requestAllCasesSuccess: (state, action: PayloadAction<ICaseList>) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        requestAllCasesError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

const { actions, reducer } = allCasesModule;

const fetchAllCases = () => (dispatch: IRootDispatch) => {
    dispatch(actions.requestAllCases());
    /* return httpService.get('summary')
        .then((response) => {
            dispatch(actions.requestAllCasesSuccess(response.data));
        })
        .catch((error) => dispatch(actions.requestAllCasesError(error))); */
    return httpService.get('all')
        .then((response) => {
            dispatch(actions.requestAllCasesSuccess(response.data));
        })
        .catch((error) => dispatch(actions.requestAllCasesError(error.toString())));
};

export const thunks = {
    fetchAllCases,
};

export { actions };

export default reducer;

/* function shouldFetchFilms(state) {
    const length = state.films.data.length;
    return !length;
}

export function fetchFilmsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchFilms(getState())) {
            return dispatch(fetchFilms())
        }
    }
} */
