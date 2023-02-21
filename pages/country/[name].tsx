import type {GetStaticProps, GetStaticPaths} from 'next';
import type {Country} from '@/utils/types/country';
import {Button, Container, Icon} from '@chakra-ui/react';
import {FaHome} from 'react-icons/fa';
import {Meta} from '@/components/Meta';
import {CountryCard} from '@/components/country/CountryPageCard';
import {URL} from '@/utils/settings/constants';
import {api} from '@/utils/api';
import {useRouter} from 'next/navigation';

export type CountryPageProps = {
  country: Country;
  borderCountries: string[];
};
export default function CountryPage(props: CountryPageProps): JSX.Element {
  const router = useRouter();
  return (
    <>
      <Meta page={props.country.name.common} icon={props.country.flags.svg} />
      <Container
        maxW={{
          base: 'container.sm',
          md: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl',
          '2xl': 'container.2xl',
        }}
        flex="1"
      >
        <Button
          leftIcon={<Icon as={FaHome} />}
          colorScheme="telegram"
          onClick={() => router.push('/')}
        >
          Home
        </Button>
        <CountryCard {...props} />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await api<Country[]>(URL);

  const paths = countries.map((country) => {
    return {
      params: {name: country.name.common.toLowerCase()},
    };
  });

  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context || !context.params || typeof context.params.name !== 'string') {
    return {notFound: true};
  }

  const country = await api<Country>(`${URL}name/${context.params.name}`);

  const borderCountries = country.borders
    ? await Promise.all(
        country.borders.map(
          async (borderCode) => await api<Country>(`${URL}cca3/${borderCode}`)
        )
      )
    : [];

  return {props: {country: country, borderCountries}};
};
