import React, { FC, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, ICountriesCaseListState, ICountry } from 'store/countriesCaseList';
import { IRootState } from 'store';
import { formatNumber } from 'utils';
import { Column, CellProps } from 'react-table';
import Table from './table';
import styles from './index.module.scss';


const { tdAlignRight, tdAlignLeft } = styles;

type IProps = ICountriesCaseListState & ResolveThunks<Pick<typeof thunks, 'fetchCountriesCaseList'>>;
type IFormatedNumberProps = {
    value: number;
    className: string;
};
type ICountryNameProps = {
    value: string;
    className: string;
};

const FormattedNumber: FC<IFormatedNumberProps> = (
    { value, className },
) => <div className={className}>{formatNumber(value)}</div>;

const CountryName: FC<ICountryNameProps> = (
    { value, className },
) => <div className={className}>{value}</div>;

const columns: Column<ICountry>[] = [
    {
        id: 'country',
        Header: 'Country',
        accessor: 'country',
        Cell: ({ value }) => <CountryName value={value} className={tdAlignLeft} />,
    },
    {
        id: 'cases',
        Header: 'Cases',
        columns: [
            {
                id: 'cases.cases',
                Header: 'Total cases',
                accessor: 'cases',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
            {
                id: 'cases.todayCases',
                Header: 'New cases',
                accessor: 'todayCases',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
            {
                id: 'cases.casesPerOneMillion',
                Header: 'Cases Per One Million',
                accessor: 'casesPerOneMillion',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
            {
                id: 'cases.percent',
                Header: '% of cases from the population',
                accessor: (row) => {
                    const { cases, population } = row;
                    const percent = (cases / population) * 100;

                    if (population) {
                        return percent;
                    }

                    return 0;
                },

                Cell: ({ row: { original } }: CellProps<ICountry>) => {
                    const { cases, population } = original;
                    const percent = ((cases / population) * 100).toFixed(3);
                    if (population) {
                        return <div className={tdAlignRight}>{percent}</div>;
                    }

                    return <div className={tdAlignRight}>N/A</div>;
                },
                sortType: 'basic',
            },
        ],
    },
    {
        id: 'deaths',
        Header: 'Deaths',
        columns: [
            {
                id: 'deaths.deaths',
                Header: 'Total deaths',
                accessor: 'deaths',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
            {
                id: 'deaths.todayDeaths',
                Header: 'New deaths',
                accessor: 'todayDeaths',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
            {
                id: 'deaths.deathsPerOneMillion',
                Header: 'Deaths Per One Million',
                accessor: 'deathsPerOneMillion',
                Cell: ({ value }) => <FormattedNumber value={value} className={tdAlignRight} />,
            },
        ],
    },
    {
        id: 'recovered',
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
            {data && <Table<ICountry> data={data} columns={columns} />}
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
