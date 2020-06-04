import React, { FC } from 'react';
import { connect } from 'react-redux';
import { selectors } from 'store/countriesCaseList';
import { actions } from 'store/historyCountriesCaseList';
import { IRootState } from 'store';
import ReactSelect, { ValueType, OptionsType } from 'react-select';

export type ICountryListItem = {
    value: string;
    label: string;
};

type IProps = {
    countryList?: string[];
} & {selectedCountries: string[]} & Pick<typeof actions, 'selectCountries'>;

const Select: FC<IProps> = ({
    countryList,
    selectedCountries,
    selectCountries,
}) => {
    const onChange = (options: any) => {
        const values = Array.isArray(options)
            ? options.map((item: ICountryListItem) => item.value)
            : options != null ? [options.value] : [];
        selectCountries(values);
    };

    const options: OptionsType<ICountryListItem> = countryList?.map((item: string) => {
        const countryItem = { value: item, label: item };
        return countryItem;
    }) || [];

    const defaultValue: OptionsType<ICountryListItem> = selectedCountries?.map((item: string) => {
        const countryItem = { value: item, label: item };
        return countryItem;
    });

    return (
        <ReactSelect
            options={options}
            defaultValue={defaultValue}
            isMulti
            isSearchable
            placeholder='SeLect country'
            onChange={onChange}
        />
    );
};

const mapStateToProps = ({ countriesCaseList, historyCountriesCaseList }: IRootState) => ({
    countryList: selectors.listCountries(countriesCaseList),
    selectedCountries: historyCountriesCaseList.selectedCountries,
});

const mapDispatchToProps = {
    selectCountries: actions.selectCountries,
};
export default connect(mapStateToProps, mapDispatchToProps)(Select);
