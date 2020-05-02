import React, { FunctionComponent } from 'react';
import { IRootState } from 'store';
import { IAllCasesState } from 'store/allCases';
import { connect } from 'react-redux';
import styles from './index.module.scss';

type IProps = IAllCasesState;

const TotalCases: FunctionComponent<IProps> = ({
    data = { Global: {} },
}) => {
    const {
        Global: {
            NewConfirmed,
            TotalConfirmed,
            NewDeaths,
            TotalDeaths,
            NewRecovered,
            TotalRecovered,
        },
    } = data;

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Current status of confirmed cases</h3>
            <div className={styles.cases}>
                <div className={styles.case}>
                    <div className={styles.confirmed}>
                        {TotalConfirmed}
                        (+
                        {' '}
                        {NewConfirmed}
                        )
                    </div>
                    <span>Total cases</span>
                </div>
                <div className={styles.case}>
                    <div className={styles.deaths}>
                        {TotalDeaths}
                        (+
                        {' '}
                        {NewDeaths}
                        )
                    </div>
                    <span>Total death</span>
                </div>
                <div className={styles.case}>
                    <div className={styles.recovered}>
                        {TotalRecovered}
                        (+
                        {' '}
                        {NewRecovered}
                        )
                    </div>
                    <span>Total recovered</span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ allCases }: IRootState) => ({
    isLoading: allCases.isLoading,
    data: allCases.data,
    error: allCases.error,
});

export default connect(mapStateToProps)(TotalCases);
