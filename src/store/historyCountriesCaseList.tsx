import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import httpService from 'services';
import { PlotData } from 'plotly.js';
import { IRootDispatch } from './index';

type timeline = {
    cases: object;
    deaths: object;
    recovered: object;
}

export interface IHistoryCountry {
    country: string;
    provinces: [];
    timeline: timeline;
}

export type IHistoryCountriesCaseListState = {
    isLoading: boolean;
    data?: IHistoryCountry[];
    error?: string;
};

export const initialState: IHistoryCountriesCaseListState = {
    isLoading: false,
    data: undefined,
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
            state, action: PayloadAction<IHistoryCountry[]>,
        ) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        requestHistoryCountriesCaseListError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { actions, reducer } = historyCountriesCaseListModule;

const fetchHistoryCountriesCaseList = () => (dispatch: IRootDispatch) => {
    dispatch(actions.requestHistoryCountriesCaseList());
    return httpService.get('historical/Belarus,Sweden?lastdays=all')
        .then((response) => {
            dispatch(actions.requestHistoryCountriesCaseListSuccess(response.data));
        })
        .catch((error) => dispatch(actions.requestHistoryCountriesCaseListError(error.toString())));
};

export const thunks = {
    fetchHistoryCountriesCaseList,
};

const selectScatterData = createSelector(
    (state: IHistoryCountriesCaseListState) => state.data,
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
