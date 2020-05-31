import React from 'react';
import {
    useTable,
    useFlexLayout,
    useSortBy,
    Column,
    Row,
} from 'react-table';
import { Code, ChevronUp, ChevronDown } from 'react-feather';
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
                    {headerGroups.map((headerGroup, index) => (
                        <div
                            {...headerGroup.getHeaderGroupProps({
                                style: { paddingRight: '10px' },
                            })}
                            className={styles.tr}
                        >
                            <div
                                role='columnheader'
                                className={styles.thRowNumber}
                            >
                                <span>{headerGroups.length - 1 === index ? '№' : ' '}</span>
                            </div>
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
                                                        <ChevronDown color='white' size={12} />
                                                    )
                                                    : (
                                                        <ChevronUp color='white' size={12} />
                                                    )
                                                : (
                                                    <Code color='white' size={12} style={{ transform: 'rotate(90deg)' }} />
                                                )
                                            : ''}

                                    </span>

                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()} className={styles.tbody}>
                    {rows.map((row: Row<T>, index) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} className={styles.tr}>
                                <div
                                    role='cell'
                                    className={styles.tdRowNumber}
                                >
                                    <div className={styles.tdAligncenter}>
                                        {index + 1}
                                    </div>
                                </div>
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
