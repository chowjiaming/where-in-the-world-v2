export type CountryFilterData = {
  searchTerm: string;
  regionFilter: Regions;
};

export enum Regions {
  All,
  Africa,
  Americas,
  Asia,
  Europe,
  Oceania,
}
