/* eslint-disable @typescript-eslint/restrict-template-expressions */

/* Will refactor this later */

export const URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT}/api/countries/`
    : `${process.env.URL}/api/countries/`;
