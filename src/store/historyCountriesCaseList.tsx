import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import httpService from 'services';
import { PlotData } from 'plotly.js';
import { IRootDispatch } from './index';

type timeline = {
    cases: object;
    deaths: object;
    recovered: object;
}

export interface IHistoryOfCountry {
    country: string;
    provinces: [];
    timeline: timeline;
}

export type IHistoryCountriesCaseListState = {
    isLoading: boolean;
    data?: IHistoryOfCountry[];
    selectedCountries: string[];
    error?: string;
};

export const initialState: IHistoryCountriesCaseListState = {
    isLoading: false,
    data: undefined,
    selectedCountries: ['USA', 'Brazil', 'Russia', 'Spain', 'UK'],
    error: undefined,
};

export const historyCountriesCaseListModule = createSlice({
    name: 'historyCountriesCaseList',
    initialState,
    reducers: {
        requestHistoryCountriesCaseList: (state) => {
            state.isLoading = true;
        },
        requestHistoryCountriesCaseListSuccess: (
            state, action: PayloadAction<IHistoryOfCountry[]>,
        ) => {
            state.isLoading = false;
            state.data = state.data ? [...state.data, ...action.payload] : action.payload;
        },
        requestHistoryCountriesCaseListError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        selectCountries: (state, action: PayloadAction<string[]>) => {
            state.selectedCountries = action.payload;
        },
    },
});

export const { actions, reducer } = historyCountriesCaseListModule;

const fetchHistoryCountriesCaseList = (
    selectedCountries: string,
) => (dispatch: IRootDispatch) => {
    dispatch(actions.requestHistoryCountriesCaseList());

    const url = `historical/${selectedCountries}?lastdays=all`;
    if (selectedCountries.length !== 0) {
        return httpService.get(url)
            .then((response) => {
                const dataInArray = Array.isArray(response.data) ? response.data : [response.data];
                dispatch(actions.requestHistoryCountriesCaseListSuccess(dataInArray));
            })
            .catch((
                error,
            ) => dispatch(actions.requestHistoryCountriesCaseListError(error.toString())));
    }

    return null;
};

export const thunks = {
    fetchHistoryCountriesCaseList,
};

const selectScatterData = createSelector(
    (state: IHistoryCountriesCaseListState) => state.data?.filter(
        (item) => state.selectedCountries.includes(item.country)),
    (data) => {
        const scatter: Partial<PlotData>[] | undefined = data?.map((item) => {
            const { country, timeline: { cases } } = item;
            const x = Object.keys(cases);
            const y = Object.values(cases);

            return {
                x,
                y,
                type: 'scatter',
                name: country,
            };
        });
        return scatter;
    },
);

export const selectors = {
    selectScatterData,
};

export default reducer;
