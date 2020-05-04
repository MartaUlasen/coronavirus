import React, { FunctionComponent, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, ICaseListState } from 'store/caseList';
import { IRootState } from 'store';
import CaseList from 'components/caseList';

type IProps = ICaseListState & Pick<ResolveThunks<typeof thunks>, 'fetchAllCases'>;

const Home: FunctionComponent<IProps> = ({
    isLoading,
    error,
    data,
    fetchAllCases,
}) => {
    useEffect(() => {
        fetchAllCases();
    }, [fetchAllCases]);

    const renderHome = () => {
        if (isLoading) return 'LOADING';
        if (data) return <CaseList />;
        if (error) return <span>{error}</span>;
        return null;
    };
    return (
        <div>
            {renderHome()}
        </div>
    );
};

const mapStateToProps = ({ allCases }: IRootState) => ({
    isLoading: allCases.isLoading,
    data: allCases.data,
    error: allCases.error,
});

const mapDispatchToProps = {
    fetchAllCases: thunks.fetchAllCases,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
