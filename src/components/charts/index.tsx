import React, { FC, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, selectors } from 'store/historyCountriesCaseList';
import { IRootState } from 'store';
import Plot from 'react-plotly.js';
import { PlotData } from 'plotly.js';

type IProps = {
    isLoading: boolean;
    error?: string;
    data?: Partial<PlotData>[];
} & ResolveThunks<Pick<typeof thunks, 'fetchHistoryCountriesCaseList'>>;

const Chart: FC<IProps> = ({
    isLoading,
    error,
    data,
    fetchHistoryCountriesCaseList,
}) => {
    useEffect(() => {
        fetchHistoryCountriesCaseList();
    }, [fetchHistoryCountriesCaseList]);

    return (
        <>
            {isLoading ? 'LOADING' : null}
            {data
                ? (
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
});

const mapDispatchToProps = {
    fetchHistoryCountriesCaseList: thunks.fetchHistoryCountriesCaseList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
