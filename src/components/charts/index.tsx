import React, { FC, useEffect, useCallback } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, selectors } from 'store/historyCountriesCaseList';
import { IRootState } from 'store';
import Plot from 'react-plotly.js';
import { PlotData } from 'plotly.js';
import Select from 'components/select';
import Loader from 'components/loader';

type IProps = {
    isLoading: boolean;
    error?: string;
    data?: Partial<PlotData>[];
    selectedCountries: string[];
} & ResolveThunks<Pick<typeof thunks, 'fetchHistoryCountriesCaseList'>>;

const Chart: FC<IProps> = ({
    isLoading,
    error,
    data,
    selectedCountries,
    fetchHistoryCountriesCaseList,
}) => {
    const contriesFromState = data?.map((item) => item.name);
    const countriesForQuery = selectedCountries.filter(
        (country) => !contriesFromState?.includes(country),
    ).join();

    const fetchHistoryCountriesCaseListIfNeeded = useCallback(
        () => {
            if (countriesForQuery.length) {
                fetchHistoryCountriesCaseList(countriesForQuery);
            }
            return null;
        },
        [fetchHistoryCountriesCaseList, countriesForQuery],
    );

    useEffect(() => {
        fetchHistoryCountriesCaseListIfNeeded();
    }, [fetchHistoryCountriesCaseListIfNeeded]);

    return (
        <>
            { isLoading && <Loader /> }
            {data
                ? (
                    <>
                        <Select />
                        <Plot
                            useResizeHandler
                            style={{
                                width: '100%',
                                marginBottom: '20px',
                            }}
                            data={data ?? []}
                            layout={{
                                title: 'Total confirmed COVID-19 cases by selected countries', autosize: true,
                            }}
                        />
                    </>
                )
                : null}
            {error ? { error } : null}
        </>
    );
};

const mapStateToProps = ({ historyCountriesCaseList }: IRootState) => ({
    isLoading: historyCountriesCaseList.isLoading,
    data: selectors.selectScatterData(historyCountriesCaseList),
    error: historyCountriesCaseList.error,
    selectedCountries: historyCountriesCaseList.selectedCountries,
});

const mapDispatchToProps = {
    fetchHistoryCountriesCaseList: thunks.fetchHistoryCountriesCaseList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
