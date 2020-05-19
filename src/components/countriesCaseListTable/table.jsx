import React from 'react';
import {
    useTable,
    useFlexLayout,
    useSortBy,
} from 'react-table';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import styles from './index.module.scss';

const Table = ({ data, columns }) => {
    const defaultColumn = () => ({
        minWidth: 30,
        width: 100,
        maxWidth: 200,
    });

    const {
        getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useFlexLayout,
        useSortBy,
    );

    return (
        <div className={styles.tableWrapper}>
            <div {...getTableProps()} className={styles.table}>
                <div>
                    {headerGroups.map((headerGroup) => (
                        <div
                            {...headerGroup.getHeaderGroupProps({
                            })}
                            className={styles.tr}
                        >
                            {headerGroup.headers.map((column) => (
                                <div
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={styles.th}
                                >
                                    <span>
                                        {column.render('Header')}
                                        {column.canSort
                                            ? column.isSorted
                                                ? column.isSortedDesc
                                                    ? (
                                                        <SwapVertIcon
                                                            style={{
                                                                fontSize: 'medium',
                                                            }}
                                                        />
                                                    )
                                                    : (
                                                        <SwapVertIcon
                                                            style={{
                                                                fontSize: 'medium',
                                                            }}
                                                        />
                                                    )
                                                : (
                                                    <SwapVertIcon
                                                        style={{
                                                            fontSize: 'small',
                                                        }}
                                                    />
                                                )
                                            : ''}

                                    </span>

                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()} className={styles.tbody}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} className={styles.tr}>
                                {row.cells.map((cell) => (
                                    <div
                                        {...cell.getCellProps()}
                                        className={cell.column.className}
                                    >
                                        {cell.render('Cell')}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Table;
