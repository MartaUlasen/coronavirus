import React, { FC, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, ICountriesCaseListState, ICountry } from 'store/countriesCaseList';
import { IRootState } from 'store';
import { formatNumber } from 'utils';
import { Column } from 'react-table';
import Table from './table';
import styles from './index.module.scss';


const { tdAlignRight, tdAlignLeft } = styles;

type IProps = ICountriesCaseListState & ResolveThunks<Pick<typeof thunks, 'fetchCountriesCaseList'>>;
type IFormatedNumberProps = {
    value: number,
    className: string,
};
type ICountryNameProps = {
    value: string,
    className: string,
};

const FormattedNumber: FC<IFormatedNumberProps> = (
    { value, className },
) => <div className={className}>{formatNumber(value)}</div>;
const CountryName: FC<ICountryNameProps> = (
    { value, className },
) => <div className={className}>{value}</div>;

const columns: Column<ICountry>[] = [
    {
        Header: 'Country',
        accessor: 'country',
        Cell: ({ value }) => <CountryName value={value} className={tdAlignLeft} />,
        // className: tdAlignLeft,
    },
    {
        Header: 'Cases',
        columns: [
            {
                Header: 'Total cases',
                accessor: 'cases',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
            {
                Header: 'New cases',
                accessor: 'todayCases',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
            {
                Header: 'Cases Per One Million',
                accessor: 'casesPerOneMillion',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
        ],
    },
    {
        Header: 'Deaths',
        columns: [
            {
                Header: 'Total deaths',
                accessor: 'deaths',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
            {
                Header: 'New deaths',
                accessor: 'todayDeaths',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
            {
                Header: 'Deaths Per One Million',
                accessor: 'deathsPerOneMillion',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
        ],
    },
    {
        Header: 'Total recovered',
        accessor: 'recovered',
        Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
    },
];

const CountriesCaseListTable: FC<IProps> = ({
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
