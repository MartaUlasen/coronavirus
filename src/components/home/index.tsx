import React, { FunctionComponent, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, ITotalCasesState } from 'store/totalCases';
import { IRootState } from 'store';
import TotalCases from 'components/totalCases';

import CountriesCaseListTable from 'components/countriesCaseListTable';

type IProps = ITotalCasesState & Pick<ResolveThunks<typeof thunks>, 'fetchTotalCases'>;

const Home: FunctionComponent<IProps> = ({
    isLoading,
    error,
    data,
    fetchTotalCases,
}) => {
    useEffect(() => {
        fetchTotalCases();
    }, [fetchTotalCases]);

    return (
        <div>
            {isLoading ? 'LOADING' : null}
            {data
                ? (
                    <>
                        <TotalCases />
                        <CountriesCaseListTable />
                    </>
                )
                : null}
            {error ? { error } : null}
        </div>
    );
};

const mapStateToProps = ({ totalCases }: IRootState) => ({
    isLoading: totalCases.isLoading,
    data: totalCases.data,
    error: totalCases.error,
});

const mapDispatchToProps = {
    fetchTotalCases: thunks.fetchTotalCases,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
