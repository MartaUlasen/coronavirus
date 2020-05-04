import React, { FunctionComponent } from 'react';
import { IRootState } from 'store';
import { ICaseListState } from 'store/caseList';
import { connect } from 'react-redux';
import styles from './index.module.scss';

type IProps = ICaseListState;

const CaseList: FunctionComponent<IProps> = ({ data = {} }) => {
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
                <div className={styles.case}>
                    <div className={styles.confirmed}>
                        {cases}
                        (+
                        {' '}
                        {todayCases}
                        )
                    </div>
                    <span>Total cases</span>
                </div>
                <div className={styles.case}>
                    <div className={styles.deaths}>
                        {deaths}
                        (+
                        {' '}
                        {todayDeaths}
                        )
                    </div>
                    <span>Total death</span>
                </div>
                <div className={styles.case}>
                    <div className={styles.recovered}>
                        {recovered}
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

export default connect(mapStateToProps)(CaseList);
