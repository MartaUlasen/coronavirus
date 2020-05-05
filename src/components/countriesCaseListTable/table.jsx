import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { grey, indigo } from '@material-ui/core/colors';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import styles from './index.module.scss';


const Table = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy,
    );

    return (
        <div className={styles.tableContainer}>
            <h3 className={styles.title}>Current status of confirmed cases for each country</h3>
            <table {...getTableProps()} className={styles.table}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {
                                        ...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={styles.th}
                                >

                                    {column.render('Header')}
                                    {column.canSort
                                        ? column.isSorted
                                            ? column.isSortedDesc
                                                ? (
                                                    <SwapVertIcon
                                                        style={{
                                                            color: indigo[900],
                                                            fontSize: 'small',
                                                        }}
                                                    />
                                                )
                                                : (
                                                    <SwapVertIcon
                                                        style={{
                                                            color: indigo[900],
                                                            fontSize: 'small',
                                                        }}
                                                    />
                                                )
                                            : (
                                                <SwapVertIcon
                                                    style={{
                                                        color: grey[400],
                                                        fontSize: 'small',
                                                    }}
                                                />
                                            )
                                        : ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className={styles.tbody}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className={styles.tr}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()} className={styles.td}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        },
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
