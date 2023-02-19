import {useMemo} from 'react';
import {CountryFilterData, Regions} from '@/utils/types/filter';
import {Country} from '@/utils/types/country';

function searchByTerm(countries: Country[], searchTerm: string): Country[] {
  return countries.filter((country) => {
    return Object.values(country).some((val) =>
      String(val).toLowerCase().includes(searchTerm)
    );
  });
}

export const useFilterCountries = (
  countries: Country[],
  filterData: CountryFilterData
): Country[] => {
  return useMemo(() => {
    if (filterData.regionFilter && !filterData.searchTerm) {
      return countries.filter(
        (country) => country.region === Regions[filterData.regionFilter]
      );
    } else if (!filterData.regionFilter && filterData.searchTerm) {
      return searchByTerm(countries, filterData.searchTerm.toLowerCase());
    } else if (filterData.regionFilter && filterData.searchTerm) {
      return searchByTerm(
        countries.filter(
          (country) => country.region === Regions[filterData.regionFilter]
        ),
        filterData.searchTerm.toLowerCase()
      );
    } else {
      return countries;
    }
  }, [countries, filterData.regionFilter, filterData.searchTerm]);
};
