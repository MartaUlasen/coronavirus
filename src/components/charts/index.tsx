import React, { FC, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, selectors } from 'store/historyCountriesCaseList';
import { IRootState } from 'store';
import Plot from 'react-plotly.js';
import { PlotData } from 'plotly.js';
import Select from 'components/select';

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
    const selectedCountriesInString = selectedCountries.join();
    useEffect(() => {
        fetchHistoryCountriesCaseList(selectedCountriesInString);
    }, [fetchHistoryCountriesCaseList, selectedCountriesInString]);

    return (
        <>
            {isLoading ? 'LOADING' : null}
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
                                title: 'Historical data', autosize: true,
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
