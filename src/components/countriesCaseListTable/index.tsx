import React, { FunctionComponent, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, ICountriesCaseListState } from 'store/countriesCaseList';
import { IRootState } from 'store';
import Table from './table';

type IProps = ICountriesCaseListState & ResolveThunks<Pick<typeof thunks, 'fetchCountriesCaseList'>>;

const columns = [
    {
        Header: 'Country',
        accessor: 'country',
    },
    {
        Header: 'Cases',
        columns: [
            {
                Header: 'Total cases',
                accessor: 'cases',
            },
            {
                Header: 'New cases',
                accessor: 'todayCases',
            },
            {
                Header: 'Cases Per One Million',
                accessor: 'casesPerOneMillion',
            },
        ],
    },
    {
        Header: 'Deaths',
        columns: [
            {
                Header: 'Total deaths',
                accessor: 'deaths',
            },
            {
                Header: 'New deaths',
                accessor: 'todayDeaths',
            },
            {
                Header: 'Deaths Per One Million',
                accessor: 'deathsPerOneMillion',
            },
        ],
    },
    {
        Header: 'Total recovered',
        accessor: 'recovered',
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
        <div>
            {isLoading && 'LOADING'}
            {data && <Table columns={columns} data={data} />}
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
