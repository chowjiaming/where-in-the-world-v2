import type {GetStaticProps, GetStaticPaths} from 'next';
import type {Country} from '@/utils/types/country';
import {Button, ButtonGroup, Container, Icon} from '@chakra-ui/react';
import {FaArrowLeft, FaHome} from 'react-icons/fa';
import {Meta} from '@/components/Meta';
import {CountryCard} from '@/components/country/CountryPageCard';
import {useRouter} from 'next/router';
import Link from 'next/link';

const URL = 'https://restcountries.com/v3.1/';

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
        <ButtonGroup>
          <Button
            leftIcon={<Icon as={FaArrowLeft} onClick={() => router.back()} />}
          >
            Back
          </Button>
          <Button as={Link} leftIcon={<Icon as={FaHome} />} href="/">
            Home
          </Button>
        </ButtonGroup>
        <CountryCard {...props} />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${URL}all`);
  const countries: Country[] = await res.json();
  const paths = countries.map((country) => {
    return {
      params: {name: country.name.common.toLowerCase()},
    };
  });

  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${URL}name/${context?.params?.name}?fullText=true`);
  const country: Country[] = await res.json();

  const borderCountries = country[0].borders
    ? await Promise.all(
        country[0].borders.map(async (borderCode) => {
          const res = await fetch(`${URL}alpha/${borderCode}`);
          const borderCountries: Country[] = await res.json();
          return borderCountries[0].name.common;
        })
      )
    : [];

  return {props: {country: country[0], borderCountries}};
};
