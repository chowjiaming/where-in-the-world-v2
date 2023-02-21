import {type Dispatch, type SetStateAction} from 'react';
import {type CountryFilterData, Regions} from '@/utils/types/filter';
import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import {FaSearchLocation} from 'react-icons/fa';
import {type Country} from '@/utils/types/country';
import {
  type PaginationState,
  type PaginationType,
} from '@/utils/types/pagination';
import {Pagination} from '@/components/shared/pagination/Pagination';

type Props = {
  paginationState: PaginationType<Country>;
  setCountryFilterData: Dispatch<SetStateAction<CountryFilterData>>;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
};
export function CountriesControl({
  paginationState,
  setCountryFilterData,
  setPagination,
}: Props): JSX.Element {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryFilterData((prev) => ({
      ...prev,
      searchTerm: e.target.value,
    }));
  };
  const handleRegionFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryFilterData((prev) => ({
      ...prev,
      regionFilter: parseInt(e.target.value),
    }));
  };

  return (
    <Flex
      role="menu"
      justify="space-between"
      align={{
        base: 'flex-end',
        lg: 'center',
      }}
      direction={{
        base: 'column',
        lg: 'row',
      }}
      gap={{
        base: '4',
        lg: '0',
      }}
      mb="8"
    >
      <InputGroup
        role="menuitem"
        w={{
          base: 'full',
          lg: '60%',
          xl: '50%',
          '2xl': '40%',
        }}
        gap="4"
      >
        <InputLeftElement
          pointerEvents="none"
          children={
            <Icon
              as={FaSearchLocation}
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}
            />
          }
        />
        <Input
          role="search"
          flex={{
            base: '1',
            lg: '2',
          }}
          type="text"
          placeholder="Search"
          onChange={handleSearchInput}
        />
        <Select
          role="select"
          flex="1"
          placeholder="Filter region"
          onChange={handleRegionFilter}
        >
          <option value={Regions.Africa}>Africa</option>
          <option value={Regions.Americas}>Americas</option>
          <option value={Regions.Asia}>Asia</option>
          <option value={Regions.Europe}>Europe</option>
          <option value={Regions.Oceania}>Oceania</option>
        </Select>
      </InputGroup>
      {paginationState.totalPages > 1 && (
        <Pagination
          {...paginationState}
          colorScheme="telegram"
          onPageChange={(pageIndex) => {
            setPagination((prevState) => ({
              ...prevState,
              pageIndex,
            }));
          }}
        />
      )}
    </Flex>
  );
}

CountriesControl.displayName = 'CountriesControl';
