import React, { FunctionComponent } from 'react';
import { IRootState } from 'store';
import { ITotalCasesState } from 'store/totalCases';
import { connect } from 'react-redux';
import { formatNumber } from 'utils';
import styles from './index.module.scss';

type IProps = ITotalCasesState;

const TotalCases: FunctionComponent<IProps> = ({ data = {} }) => {
    const {
        cases,
        deaths,
        recovered,
        todayCases,
        todayDeaths,
    } = data;

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Current status of confirmed cases</h3>
            <div className={styles.cases}>
                <div className={styles.confirmedCases}>
                    {cases && `${formatNumber(cases)} `}
                    (+
                    {todayCases && formatNumber(todayCases)}
                    )
                    <span>Total cases</span>
                </div>
                <div className={styles.deathsCases}>
                    {deaths && `${formatNumber(deaths)} `}
                    (+
                    {todayDeaths && formatNumber(todayDeaths)}
                    )
                    <span>Total deaths</span>
                </div>
                <div className={styles.recoveredCases}>
                    {recovered && formatNumber(recovered)}
                    <span>Total recovered</span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ totalCases }: IRootState) => ({
    isLoading: totalCases.isLoading,
    data: totalCases.data,
    error: totalCases.error,
});

export default connect(mapStateToProps)(TotalCases);
