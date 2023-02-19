export const URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT}/api/countries/`
    : `${process.env.URL}/api/countries/`;
