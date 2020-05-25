import React from 'react';
import {
    useTable,
    useFlexLayout,
    useSortBy,
    Column,
    Row,
} from 'react-table';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import styles from './index.module.scss';

type IProps<T extends object> = {
    data: T[];
    columns: Column<T>[];
}

const Table = <T extends object>({ data, columns }: IProps<T>) => {
    const defaultColumn = {
        minWidth: 30,
        width: 100,
        maxWidth: 200,
    };

    const {
        getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
    } = useTable<T>(
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
                <div className={styles.thead}>
                    {headerGroups.map((headerGroup) => (
                        <div
                            {...headerGroup.getHeaderGroupProps({
                                style: { paddingRight: '10px' },
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
                    {rows.map((row: Row<T>) => {
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
