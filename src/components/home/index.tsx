import React, { FC, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, ITotalCasesState } from 'store/totalCases';
import { IRootState } from 'store';
import TotalCases from 'components/totalCases';
import Chart from 'components/charts';
import CountriesCaseListTable from 'components/countriesCaseListTable';
import Loader from 'components/loader';
import styles from './index.module.scss';

type IProps = ITotalCasesState & Pick<ResolveThunks<typeof thunks>, 'fetchTotalCases'>;

const Home: FC<IProps> = ({
    isLoading,
    error,
    data,
    fetchTotalCases,
}) => {
    useEffect(() => {
        fetchTotalCases();
    }, [fetchTotalCases]);

    return (
        <div className={styles.home}>
            {isLoading && <Loader />}
            {data
                ? (
                    <>
                        <TotalCases />
                        <Chart />
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
