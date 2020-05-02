import React, { FunctionComponent, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, IAllCasesState } from 'store/allCases';
import { IRootState } from 'store';
import TotalCases from 'components/totalCases';

type IProps = IAllCasesState & Pick<ResolveThunks<typeof thunks>, 'fetchAllCases'>;

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
        if (data) return <TotalCases />;
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
