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

export interface IGlobal {
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
    TotalRecovered: number
}

interface IAllCasesList {
    Global: IGlobal;
    Countries: ICountry[];
    Date: string;
}

export type IAllCasesState = {
    isLoading: boolean;
    data?: IAllCasesList;
    error?: string;
};

export const initialState: IAllCasesState = {
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
        requestAllCasesSuccess: (state, action: PayloadAction<IAllCasesList>) => {
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
    return httpService.get('summary')
        .then((response) => {
            dispatch(actions.requestAllCasesSuccess(response.data));
        })
        .catch((error) => dispatch(actions.requestAllCasesError(error)));
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
