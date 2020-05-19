import React, { FunctionComponent, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, ICountriesCaseListState, ICountry } from 'store/countriesCaseList';
import { IRootState } from 'store';
import { formatNumber } from 'utils';
import Table from './table';
import styles from './index.module.scss';


const { tdAlignRight, tdAlignLeft } = styles;

type IProps = ICountriesCaseListState & ResolveThunks<Pick<typeof thunks, 'fetchCountriesCaseList'>>;

const columns = [
    {
        Header: 'Country',
        accessor: 'country',
        className: tdAlignLeft,
    },
    {
        Header: 'Cases',
        columns: [
            {
                Header: 'Total cases',
                accessor: (row: ICountry) => formatNumber(row.cases),
                className: tdAlignRight,
            },
            {
                Header: 'New cases',
                accessor: (row: ICountry) => formatNumber(row.todayCases),
                className: tdAlignRight,
            },
            {
                Header: 'Cases Per One Million',
                accessor: (row: ICountry) => formatNumber(row.casesPerOneMillion),
                className: tdAlignRight,
            },
        ],
    },
    {
        Header: 'Deaths',
        columns: [
            {
                Header: 'Total deaths',
                accessor: (row: ICountry) => formatNumber(row.deaths),
                className: tdAlignRight,
            },
            {
                Header: 'New deaths',
                accessor: (row: ICountry) => formatNumber(row.todayDeaths),
                className: tdAlignRight,
            },
            {
                Header: 'Deaths Per One Million',
                accessor: (row: ICountry) => formatNumber(row.deathsPerOneMillion),
                className: tdAlignRight,
            },
        ],
    },
    {
        Header: 'Total recovered',
        accessor: (row: ICountry) => formatNumber(row.recovered),
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
