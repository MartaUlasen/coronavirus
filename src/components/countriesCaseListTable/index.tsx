import React, { FunctionComponent, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, ICountriesCaseListState } from 'store/countriesCaseList';
import { IRootState } from 'store';
import Table from './table';
import styles from './index.module.scss';

const { tdAlignRight, tdAlignCenter } = styles;

type IProps = ICountriesCaseListState & ResolveThunks<Pick<typeof thunks, 'fetchCountriesCaseList'>>;

const columns = [
    {
        Header: 'Country',
        accessor: 'country',
        className: tdAlignCenter,
    },
    {
        Header: 'Cases',
        columns: [
            {
                Header: 'Total cases',
                accessor: 'cases',
                className: tdAlignRight,
            },
            {
                Header: 'New cases',
                accessor: 'todayCases',
                className: tdAlignRight,
            },
            {
                Header: 'Cases Per One Million',
                accessor: 'casesPerOneMillion',
                className: tdAlignRight,
            },
        ],
    },
    {
        Header: 'Deaths',
        columns: [
            {
                Header: 'Total deaths',
                accessor: 'deaths',
                className: tdAlignRight,
            },
            {
                Header: 'New deaths',
                accessor: 'todayDeaths',
                className: tdAlignRight,
            },
            {
                Header: 'Deaths Per One Million',
                accessor: 'deathsPerOneMillion',
                className: tdAlignRight,
            },
        ],
    },
    {
        Header: 'Total recovered',
        accessor: 'recovered',
        className: tdAlignRight,
    },
];

const CountriesCaseListTable: FunctionComponent<IProps> = ({
    isLoading,
    error,
    data,
    fetchCountriesCaseList,
}) => {
    useEffect(() => {
        fetchCountriesCaseList();
    }, [fetchCountriesCaseList]);

    return (
        <div className={styles.caseList}>
            {isLoading && 'LOADING'}
            {data && <Table data={data} columns={columns} />}
            {error}
        </div>
    );
};

const mapStateToProps = ({ countriesCaseList }: IRootState) => ({
    isLoading: countriesCaseList.isLoading,
    data: countriesCaseList.data,
    error: countriesCaseList.error,
});

const mapDispatchToProps = {
    fetchCountriesCaseList: thunks.fetchCountriesCaseList,
};

export default connect(mapStateToProps, mapDispatchToProps)(CountriesCaseListTable);
