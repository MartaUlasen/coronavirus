import React, { FunctionComponent, useEffect } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { thunks, ICountriesCaseListState } from 'store/countriesCaseList';
import { IRootState } from 'store';

type IProps = ICountriesCaseListState & ResolveThunks<Pick<typeof thunks, 'fetchCountriesCaseList'>>;

const CountriesCaseListTable: FunctionComponent<IProps> = ({
    isLoading,
    error,
    data,
    fetchCountriesCaseList,
}) => {
    useEffect(() => {
        fetchCountriesCaseList();
    }, [fetchCountriesCaseList]);

    return (
        <div>
            {isLoading ? 'LOADING' : null}
            {data ? 'Table' : null}
            {error ? { error } : null}
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
